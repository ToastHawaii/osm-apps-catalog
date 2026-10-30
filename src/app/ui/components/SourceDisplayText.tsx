import React from "react";
import { Pen, AddSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function SourceDisplayText({
  name,
  create,
}: {
  name: string;
  create?: boolean | undefined;
}) {
  const icon = !create ? (
    <HugeiconsIcon
      className="inline-block"
      icon={Pen}
      strokeWidth={2}
      size={16}
    />
  ) : (
    <HugeiconsIcon
      className="inline-block"
      icon={AddSquareIcon}
      strokeWidth={2}
      size={16}
    />
  );

  switch (name) {
    case "taginfo":
      return <>taginfo</>;

    case "Wikidata":
      return <>Wikidata {icon}</>;

    case "GitHub":
      return <>GitHub</>;

    case "Layer":
      return <>Wiki (Layer) {icon}</>;

    case "ServiceItem":
      return <>Wiki (ServiceItem) {icon}</>;

    case "Software":
      return <>Wiki (Software) {icon}</>;

    default:
      throw new Error(`Unexpected value for name: ${name}`);
  }
}
