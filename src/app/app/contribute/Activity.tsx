import {
  ArrowDown01Icon,
  Share05Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { t } from "i18next";
import React, { isValidElement, ReactElement, ReactNode } from "react";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

import { Button } from "@components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from "@components/ui/dropdown-menu";
import {
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  Item,
} from "@components/ui/item";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@components/ui/popover";
import { useGoatCounterEvents } from "@hooks/useGoatCounterEvents";

export type Links = ({
  icon: IconSvgElement | ReactElement;
  title: ReactNode;
  description?: ReactNode;
} & (
  | {
      href: string;
      goatcounter?: {
        click: string;
        title: string;
      };
    }
  | { onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }
))[];

export function Activity(
  props: {
    title: string;
    description: string;
    icon: IconSvgElement | ReactElement;

    /** Shown when no link is available */
    hint?: string | undefined;
  } & (
    | {
        link: string | undefined;
      }
    | {
        links: Links;
      }
  ),
) {
  useGoatCounterEvents();

  const { title, description, icon } = props;

  const disabled =
    !("link" in props && props.link) &&
    !("links" in props && props.links.length);

  if (!disabled) {
    const item = (
      <>
        <ItemMedia variant="image">
          {!isValidElement(icon) ? (
            <HugeiconsIcon icon={icon} strokeWidth={2} />
          ) : (
            icon
          )}
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription className="h-10">{description}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <HugeiconsIcon
            icon={"links" in props ? ArrowDown01Icon : Share05Icon}
            className="inline-block"
            strokeWidth={2}
          />
        </ItemActions>
      </>
    );

    if ("link" in props) {
      return (
        <Item size="xs" asChild>
          <a href={props.link} target="_blank" rel="noreferrer">
            {item}
          </a>
        </Item>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Item size="xs" className="">
            {item}
          </Item>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-auto max-w-[80vw] sm:max-w-80"
        >
          {props.links.map((link, i) => {
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
                <DropdownMenuItem key={i} asChild>
                  <Item size="sm" asChild>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      {...("goatcounter" in link && link.goatcounter
                        ? {
                            "data-goatcounter-click": link.goatcounter.click,
                            "data-goatcounter-title": link.goatcounter.title,
                            "data-goatcounter-referrer":
                              "https://osm-apps.org/",
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
                <DropdownMenuItem key={i} onClick={link.onClick}>
                  <Item size="sm" asChild>
                    {item}
                  </Item>
                </DropdownMenuItem>
              );
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Item variant="muted" size="xs">
            <ItemMedia variant="image" className="opacity-40">
              {!isValidElement(icon) ? (
                <HugeiconsIcon
                  icon={icon}
                  className="inline-block"
                  strokeWidth={2}
                />
              ) : (
                icon
              )}
            </ItemMedia>
            <ItemContent className="opacity-40">
              <ItemTitle>{title}</ItemTitle>
              <ItemDescription>{description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                variant="ghost"
                className="p-1"
                size="xs"
                title={t("app.contribute.hint")}
              >
                <HugeiconsIcon
                  className="size-4"
                  icon={InformationCircleIcon}
                  aria-label={t("app.contribute.hint")}
                />
              </Button>
            </ItemActions>
          </Item>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60 whitespace-pre-line">
          {props.hint}
        </PopoverContent>
      </Popover>
    );
  }
}
