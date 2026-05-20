import {
  BarCode02Icon,
  Edit04Icon,
  MapsSearchIcon,
} from "@hugeicons/core-free-icons";
import { IconSvgElement } from "@hugeicons/react";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Activity } from "@app/app/contribute/Activity";
import { languageCodeToDisplay } from "@app/ui/lib/language";
import { App } from "@shared/data/App";

export function EditInformation({ app }: { app: App }) {
  const { t } = useTranslation();

  const osmWikiLinks: {
    icon: IconSvgElement;
    href: string;
    title: ReactNode;
    description?: ReactNode;
  }[] = [];

  if (!app.source.find(({ name }) => name === "Software" || name === "Layer")) {
    osmWikiLinks.push({
      icon: MapsSearchIcon,
      href:
        "https://wiki.openstreetmap.org/w/index.php?veaction=edit&preload=OSM_Apps_Catalog%2Fnew&editintro=OSM_Apps_Catalog%2Feditintro&summary=Document+an+OSM-related+app+so+that+it+becomes+visible+to+the+OSM+community+and+in+the+OSM+Apps+Catalog.&title=" +
        encodeURIComponent(app.name),
      title: t("app.contribute.app.editInformation.wikiOsm.create", {
        app: app.name,
      }),
    });

    osmWikiLinks.push(
      ...app.source
        .filter(({ name }) => name === "ServiceItem")
        .map(({ id, name, language }) => ({
          icon: MapsSearchIcon,
          href:
            "https://wiki.openstreetmap.org/w/index.php?veaction=edit&title=" +
            encodeURIComponent(id),
          title: t("app.contribute.app.editInformation.wikiOsm.edit", {
            name: id,
          }),
          description: (
            <>
              {languageCodeToDisplay(language)}, {name} Template
            </>
          ),
        })),
    );
  } else {
    osmWikiLinks.push(
      ...app.source
        .filter(
          ({ name }) =>
            name === "Software" || name === "Layer" || name === "ServiceItem",
        )
        .map(({ id, name, language }) => ({
          icon: MapsSearchIcon,
          href:
            name === "Software" || name === "Layer"
              ? "https://wiki.openstreetmap.org/w/index.php?veaction=edit&preload=OSM_Apps_Catalog%2Fnew&editintro=OSM_Apps_Catalog%2Feditintro&summary=Document+an+OSM-related+app+so+that+it+becomes+visible+to+the+OSM+community+and+in+the+OSM+Apps+Catalog.&title=" +
                encodeURIComponent(id)
              : "https://wiki.openstreetmap.org/w/index.php?veaction=edit&title=" +
                encodeURIComponent(id),
          title: t("app.contribute.app.editInformation.wikiOsm.edit", {
            name: id,
          }),
          description: (
            <>
              {languageCodeToDisplay(language)}, {name} Template
            </>
          ),
        })),
    );
  }

  const wikidataLinks: {
    icon: IconSvgElement;
    href: string;
    title: ReactNode;
    description?: ReactNode;
  }[] = [];

  if (!app.source.find(({ name }) => name === "Wikidata")) {
    wikidataLinks.push({
      icon: BarCode02Icon,
      href:
        "https://www.wikidata.org/w/index.php?title=Special:Search&search=" +
        encodeURIComponent(app.name),
      title: t("app.contribute.app.editInformation.wikidata.create"),
      description: t("app.contribute.app.editInformation.wikidata.search", {
        app: app.name,
      }),
    });
  } else {
    wikidataLinks.push(
      ...app.source
        .filter(({ name }) => name === "Wikidata")
        .map(({ url }) => ({
          icon: BarCode02Icon,
          href: url,
          title: t("app.contribute.app.editInformation.wikidata.edit"),
        })),
    );
  }

  return (
    <Activity
      title={t("app.contribute.activity.editInformation.title")}
      description={t("app.contribute.activity.editInformation.description", {
        app: app.name,
      })}
      icon={Edit04Icon}
      links={[
        [t("app.contribute.activity.editInformation.osmWiki"), osmWikiLinks],
        [t("app.contribute.activity.editInformation.wikidata"), wikidataLinks],
      ]}
      goatcounter={{
        click: "/app/edit",
        title: "Goes to wiki page of an app to start edit.",
      }}
    />
  );
}
