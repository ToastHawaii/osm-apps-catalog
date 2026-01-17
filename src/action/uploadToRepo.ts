import { getOctokit, context } from "@actions/github";

export async function uploadToRepo(
  filePath: string,
  content: string,
  commitMessage: string,
  ghToken: string,
): Promise<void> {
  if (!ghToken) {
    throw new Error("GitHub token is required to upload files.");
  }

  const octokit = getOctokit(ghToken);
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  // Branch aus context.ref extrahieren (z.B. "refs/heads/my-feature-branch" => "my-feature-branch")
  const ref = context.ref;
  const branch = ref.replace("refs/heads/", "");

  const base64Content = Buffer.from(content).toString("base64");

  // Prüfen, ob die Datei existiert
  let sha: string | undefined;
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    });
    if ("sha" in data) {
      sha = data.sha; // SHA der vorhandenen Datei speichern
    }
  } catch (error) {
    if ((error as { status: number })?.status !== 404) {
      throw error; // Fehler weitergeben, falls es kein 404 ist
    }
  }

  // Datei erstellen oder aktualisieren
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message: commitMessage,
    content: base64Content,
    sha,
    branch,
  });

  console.log(`File "${filePath}" has been uploaded to branch "${branch}".`);
}
