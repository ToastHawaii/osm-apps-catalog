import { About } from "@components/layout/about";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import React from "react";
import { Link } from "react-router";

export function Header() {
  return (
    <div className="sticky top-0 left-0 z-10 bg-white">
      <div className="flex px-8 py-4">
        <Button asChild variant="ghost" className="font-semibold">
          <Link to="/">OSM App Catalog</Link>
        </Button>
        <About />
      </div>
      <Separator />
    </div>
  );
}
