import React from "react";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

import { ExternalLink } from "@components/common/ExternalLink";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import { App } from "@shared/data/App";
import { contribute } from "@shared/lib/filters";

export function DownloadButton({
  app,
  icon,
  iconClassName,
  label,
  href,
  variant,
}: {
  app: App;
  icon?: IconSvgElement | undefined;
  iconClassName?: string | undefined;
  label: string;
  href: string | undefined;
  variant?: "default" | "outline";
}) {
  return (
    <Button className="grow md:flex-none" variant={variant} asChild>
      <ExternalLink
        variant={null}
        icon
        href={href}
        data-goatcounter-click={`/app/download${contribute(app) ? "?category=edit" : ""}`}
        data-goatcounter-title="Goes to a download page of an app."
        data-goatcounter-referrer="https://osm-apps.org/"
      >
        {icon && (
          <HugeiconsIcon
            icon={icon}
            className={cn("inline-block", iconClassName)}
            strokeWidth={1.4}
            size={22}
            style={{ width: 22, height: 22 }}
          />
        )}{" "}
        {label}
      </ExternalLink>
    </Button>
  );
}
