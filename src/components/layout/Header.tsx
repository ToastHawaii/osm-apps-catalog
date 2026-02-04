import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import React from "react";
import { Link } from "react-router";

export function Header() {
  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="flex px-8 py-4">
        <Button asChild variant="ghost" className="font-semibold">
          <Link to="/">OSM App Catalog</Link>
        </Button>
      </div>
      <Separator />
    </div>
  );
}
