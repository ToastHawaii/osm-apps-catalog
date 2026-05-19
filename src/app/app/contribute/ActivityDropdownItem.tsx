import { DropdownMenuItem } from "@components/ui/dropdown-menu";
import {
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  Item,
} from "@components/ui/item";
import { useGoatCounterEvents } from "@hooks/useGoatCounterEvents";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import React from "react";
import { isValidElement, ReactElement, ReactNode } from "react";

export type Link = {
  icon: IconSvgElement | ReactElement;
  title: ReactNode;
  description?: ReactNode;
  goatcounter?: {
    click: string;
    title: string;
  };
} & (
  | { href: string }
  | { onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }
);

export function ActivityDropdownItem(link: Link) {
  useGoatCounterEvents();

  const item = (
    <>
      <ItemMedia variant="icon">
        {!isValidElement(link.icon) ? (
          <HugeiconsIcon
            icon={link.icon}
            className="inline-block"
            strokeWidth={2}
            size={19.25}
            style={{ width: 19.25, height: 19.25 }}
          />
        ) : (
          link.icon
        )}
      </ItemMedia>
      <ItemContent className="gap-0">
        <ItemTitle>{link.title}</ItemTitle>
        {link.description && (
          <ItemDescription className="leading-none">
            {link.description}
          </ItemDescription>
        )}
      </ItemContent>
    </>
  );

  if ("href" in link) {
    return (
      <DropdownMenuItem asChild>
        <Item size="sm" asChild>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            {...("goatcounter" in link && link.goatcounter
              ? {
                  "data-goatcounter-click": link.goatcounter.click,
                  "data-goatcounter-title": link.goatcounter.title,
                  "data-goatcounter-referrer": "https://osm-apps.org/",
                }
              : {})}
          >
            {item}
          </a>
        </Item>
      </DropdownMenuItem>
    );
  } else {
    return (
      <DropdownMenuItem onClick={link.onClick}>
        <Item size="sm" asChild>
          {item}
        </Item>
      </DropdownMenuItem>
    );
  }
}
