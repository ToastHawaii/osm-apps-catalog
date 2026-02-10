import { cn } from "@lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const externalLinkVariants = cva("underline-offset-4 hover:underline", {
  variants: {
    variant: {
      default: "text-primary",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function ExternalLink({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"a"> &
  VariantProps<typeof externalLinkVariants> & {
    asChild?: boolean;
  }) {
  return (
    <a
      data-variant={variant}
      className={cn(externalLinkVariants({ variant, className }))}
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  );
}
