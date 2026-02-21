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
import { usePlatformUrlParam } from "@hooks/usePlatformUrlParam";
import { useCurrentRouteName } from "@hooks/useCurrentRouteName";
import { Badge } from "@components/ui/badge";
import { ThemeModeToggle } from "@components/layout/ThemeModeToggle";
import { useRoute } from "@hooks/useRoute";
import { useIsTechDomain } from "@hooks/useIsTechDomain";

export function Header() {
  const { t } = useTranslation();

  const routes = useRoute();
  const currentRoute = useCurrentRouteName();

  const platforms = usePlatformUrlParam().map((t) => t.toLowerCase());
  const isTech = useIsTechDomain();

  return (
    <div className="sticky top-0 left-0 z-10 bg-white">
      <div className="flex px-8 py-4">
        <Button asChild variant="ghost" className="font-semibold">
          <Link
            to={
              currentRoute === "home"
                ? routes.home({ domain: undefined, platforms })
                : routes.home({ platforms })
            }
          >
            {isTech ? (
              <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                Tech
              </Badge>
            ) : (
              ""
            )}{" "}
            OSM App Catalog
          </Link>
        </Button>

        <div className="grow" />

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                data-active={currentRoute === "search"}
              >
                <Link to={routes.search({ platforms })}>{t("nav.search")}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                data-active={isTech}
              >
                {isTech ? (
                  <Link to={routes.home({ domain: "" })}>
                    {t("nav.leaveTech")}
                  </Link>
                ) : (
                  <Link to={routes.home({ domain: "tech" })}>
                    {t("nav.tech")}
                  </Link>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href={routes.docs({ lang: i18next.resolvedLanguage })}>
                  {t("nav.about")}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ThemeModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Separator />
    </div>
  );
}
