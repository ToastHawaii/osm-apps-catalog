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
import { routeFactory } from "@hooks/useRoutes";
import { usePlatformUrlParam } from "@hooks/usePlatformUrlParam";
import { useCurrentRouteName } from "@hooks/useCurrentRouteName";

export function Header() {
  const { t } = useTranslation();

  const routes = routeFactory();
  const currentRoute = useCurrentRouteName();

  const platforms = usePlatformUrlParam().map((t) => t.toLowerCase());

  return (
    <div className="sticky top-0 left-0 z-10 bg-white">
      <div className="flex px-8 py-4">
        <Button asChild variant="ghost" className="font-semibold">
          <Link to={routes.home({ platforms })}>OSM App Catalog</Link>
        </Button>

        <div className="grow" />

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                active={currentRoute === "search"}
              >
                <Link to={routes.search({ platforms })}>{t("nav.search")}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                active={currentRoute === "tech"}
              >
                <Link to={routes.tech()}>{t("category.tech")}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href={routes.doc({ lang: i18next.resolvedLanguage })}>
                  {t("nav.about")}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Separator />
    </div>
  );
}
