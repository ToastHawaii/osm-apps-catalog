function getMatrixRoom(
  matrixRoom: string | undefined,
  irc?:
    | { server?: string | undefined; channel?: string | undefined }
    | undefined,
) {
  if (matrixRoom) {
    return matrixRoom;
  }

  if (irc && irc.channel) {
    const channel = irc.channel.startsWith("#")
      ? irc.channel
      : "#" + irc.channel;

    // See https://matrix-org.github.io/matrix-appservice-irc/latest/bridged_networks.html
    const matrix_irc_bridges: Record<string, string | undefined> = {
      // The freenode IRC bridge offically was shut down on 2021-12-20.
      // "irc.freenode.net": `#freenode_${channel}:matrix.org`,
      "irc.oftc.net": `#_oftc_${channel}:matrix.org`,
      // The Libera Chat IRC bridge was shut down on 2023-11-28.
      // "irc.libera.chat": `${channel}:libera.chat`,
    };

    // From https://wiki.openstreetmap.org/wiki/Module:Communication_channels
    const irc_server = irc.server || "irc.oftc.net";

    return matrix_irc_bridges[irc_server];
  }

  return undefined;
}

export function getMatrix(
  matrixRoom: string | undefined,
  irc?:
    | { server?: string | undefined; channel?: string | undefined }
    | undefined,
) {
  const link = getMatrixRoom(matrixRoom, irc);

  if (!link) {
    return undefined;
  }

  return `https://matrix.to/#/${link}`;
}
