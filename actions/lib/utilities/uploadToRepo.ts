import { context, getOctokit } from "@actions/github";

export async function uploadToRepo(
  files: { filePath: string; content: string }[],
  commitMessage: string,
  ghToken: string,
): Promise<void> {
  if (!ghToken) {
    throw new Error("GitHub token is required to upload files.");
  }

  if (!files.length) {
    return;
  }

  const octokit = getOctokit(ghToken);
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  // Extract branch from context.ref (e.g. "refs/heads/main" → "main")
  const ref = context.ref;
  const branch = ref.replace("refs/heads/", "");

  // 1. Get current branch reference
  const { data: branchRef } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`,
  });

  const latestCommitSha = branchRef.object.sha;

  // 2. Get latest commit to obtain base tree
  const { data: latestCommit } = await octokit.rest.git.getCommit({
    owner,
    repo,
    commit_sha: latestCommitSha,
  });

  const baseTreeSha = latestCommit.tree.sha;

  // 3. Create blobs for each file
  const treeItems = await Promise.all(
    files.map(async ({ filePath, content }) => {
      const { data: blob } = await octokit.rest.git.createBlob({
        owner,
        repo,
        content,
        encoding: "utf-8",
      });

      return {
        path: filePath,
        mode: "100644" as const,
        type: "blob" as const,
        sha: blob.sha,
      };
    }),
  );

  // 4. Create a new tree including all files
  const { data: newTree } = await octokit.rest.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree: treeItems,
  });

  // 5. Create a single commit
  const { data: newCommit } = await octokit.rest.git.createCommit({
    owner,
    repo,
    message: commitMessage,
    tree: newTree.sha,
    parents: [latestCommitSha],
  });

  // 6. Update branch reference to point to new commit
  await octokit.rest.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.sha,
  });

  console.log(
    `Uploaded ${files.length} file(s) to branch "${branch}" in one commit:\n${files.map((f) => f.filePath).join("\n")}`,
  );
}
