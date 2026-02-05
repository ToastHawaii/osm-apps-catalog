import React from "react";
import { Link } from "react-router";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu";
import { useAppState } from "@hooks/useAppState";

export function Header() {
  const { t } = useTranslation();

  const [state] = useAppState();

  const platforms = state.platforms.map((t) => t.toLowerCase());
  return (
    <div className="sticky top-0 left-0 z-10 bg-white">
      <div className="flex px-8 py-4">
        <Button asChild variant="ghost" className="font-semibold">
          <Link to="/">OSM App Catalog</Link>
        </Button>
        <div className="grow"></div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                active={state.view === "search"}
              >
                <Link
                  to={{
                    search: `?view=search&platforms=${platforms.join("%2B")}`,
                  }}
                >
                  {t("nav.search")}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  to={`/docs/${
                    i18next.resolvedLanguage !== "en"
                      ? `${i18next.resolvedLanguage}/`
                      : ""
                  }`}
                >
                  {t("nav.about")}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Separator />
    </div>
  );
}
