export function getMatrix(
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
      "irc.freenode.net": `#freenode_${channel}:matrix.org`,
      "irc.oftc.net": `#_oftc_${channel}:matrix.org`,
      "irc.libera.chat": `${channel}:libera.chat`,
    };

    // From https://wiki.openstreetmap.org/wiki/Module:Communication_channels
    const irc_server = irc.server || "irc.oftc.net";

    return matrix_irc_bridges[irc_server];
  }

  return undefined;
}
