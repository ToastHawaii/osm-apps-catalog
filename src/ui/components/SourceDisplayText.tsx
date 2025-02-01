import React from "react";

export function SourceDisplayText({ name , create}: { name: string , create?:boolean|undefined}) {

const icon = !create? <i className="fas fa-pen"></i> : <i className="fas fa-plus"></i>

  switch (name) {
    case "taginfo":
      return <>taginfo</>;

    case "Wikidata":
      return (
        <>
          Wikidata {icon}
        </>
      );

    case "Layer":
      return (
        <>
          Wiki (Layer) {icon}
        </>
      );

    case "ServiceItem":
      return (
        <>
          Wiki (ServiceItem) {icon}
        </>
      );

    case "Software":
      return (
        <>
          Wiki (Software) {icon}
        </>
      );

    default:
      throw new Error(`Unexpected value for name: ${name}`);
  }
}
