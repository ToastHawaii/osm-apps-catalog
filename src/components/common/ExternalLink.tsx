import { Share05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
  icon,
  ...props
}: React.ComponentProps<"a"> &
  VariantProps<typeof externalLinkVariants> & {
    asChild?: boolean;
    icon?: boolean | undefined;
  }) {
  return (
    <a
      data-variant={variant}
      className={cn(externalLinkVariants({ variant, className }))}
      target="_blank"
      rel="noreferrer"
      {...{
        ...props,
        children: (
          <>
            {props.children}
            {!!icon && (
              <>
                {" "}
                <HugeiconsIcon
                  icon={Share05Icon}
                  className="inline-block"
                  strokeWidth={2}
                  style={{ width: "1em", height: "1em", marginTop: "-2px" }}
                />
              </>
            )}
          </>
        ),
      }}
    />
  );
}
