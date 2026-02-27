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
import { HugeiconsIcon } from "@hugeicons/react";
import { HelpCircleIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { featureFlags } from "../../featureFlags";

export function Header() {
  const { t } = useTranslation();

  const routes = useRoute();
  const currentRoute = useCurrentRouteName();

  const platforms = usePlatformUrlParam();
  const isTechView = useIsTechDomain();

  return (
    <div className="sticky top-0 left-0 z-10 bg-white">
      <div className="flex px-1 py-2 md:px-8 md:py-4">
        <Button asChild variant="ghost" className="font-semibold">
          <Link
            to={
              currentRoute === "home"
                ? routes.home({ domain: undefined, platforms })
                : routes.home({ platforms })
            }
          >
            <img
              src="/assets/osm-apps-logo-small.png"
              alt="OSM App Catalog"
              className="mr-1 h-6 w-6"
            />{" "}
            {!isTechView ? (
              "OSM App Catalog"
            ) : (
              <>
                <span className="hidden md:inline">OSM App Catalog</span>
                <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  Tech
                </Badge>
              </>
            )}
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
                <Link
                  to={
                    !isTechView
                      ? routes.search({ platforms })
                      : routes.search({})
                  }
                >
                  <HugeiconsIcon
                    className="md:hidden"
                    size={16}
                    icon={Search01Icon}
                    strokeWidth={2}
                    aria-label={t("nav.search")}
                  />{" "}
                  <span className="hidden md:inline">{t("nav.search")}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {!isTechView ? (
              <NavigationMenuItem className="hidden md:inline">
                <NavigationMenuLink
                  asChild
                  className={
                    navigationMenuTriggerStyle() +
                    " hover:bg-purple-500/10! hover:text-purple-500"
                  }
                >
                  <Link to={routes.home({ domain: "tech" })}>
                    {t("nav.tech")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={
                    navigationMenuTriggerStyle() +
                    " bg-purple-500/10! text-purple-500 hover:bg-purple-500/20!"
                  }
                  data-active={true}
                >
                  <Link to={routes.home({ domain: undefined })}>
                    {t("nav.leaveTech")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href={routes.docs({ lang: i18next.resolvedLanguage })}>
                  <HugeiconsIcon
                    className="md:hidden"
                    size={16}
                    icon={HelpCircleIcon}
                    aria-label={t("nav.about")}
                  />{" "}
                  <span className="hidden md:inline">{t("nav.about")}</span>
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {featureFlags.showThemeModeToggle && (
              <NavigationMenuItem>
                <ThemeModeToggle />
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Separator />
    </div>
  );
}
