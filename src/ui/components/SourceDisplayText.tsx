import React from "react";

export function SourceDisplayText({ name }: { name: string }) {
  switch (name) {
    case "taginfo":
      return <>taginfo</>;

    case "Wikidata":
      return (
        <>
          Wikidata <i className="fas fa-pen"></i>
        </>
      );

    case "Layer":
      return (
        <>
          Wiki (Layer) <i className="fas fa-pen"></i>
        </>
      );

    case "ServiceItem":
      return (
        <>
          Wiki (ServiceItem) <i className="fas fa-pen"></i>
        </>
      );

    case "Software":
      return (
        <>
          Wiki (Software) <i className="fas fa-pen"></i>
        </>
      );

    default:
      throw new Error(`Unexpected value for name: ${name}`);
  }
}
