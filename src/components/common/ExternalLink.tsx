import { cn } from "@lib/utils";
import React, { AnchorHTMLAttributes } from "react";

export function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={cn(
        props.className,
        "text-primary underline-offset-4 hover:underline",
      )}
      target="_blank"
      rel="noreferrer"
    />
  );
}
