import { Separator } from "@components/ui/separator";
import React from "react";
import { Link } from "react-router";

export function Header() {
  return (
    <>
      <div className="px-8 py-6">
        <h2 className="text-left font-semibold">
          <Link to="/">OSM App Catalog</Link>
        </h2>
      </div>
      <Separator />
    </>
  );
}
