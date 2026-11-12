import { Button } from "@components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "@components/ui/card";
import { useDownloadTracking } from "@hooks/useDownloadTracking";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { App } from "@shared/data/App";
import React from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "@components/common/ExternalLink";

export function SupportOpenStreetMap({ app }: { app: App }) {
  const { t } = useTranslation();
  const { hideSupportPanel } = useDownloadTracking();

  return (
    <Card className="bg-linear-110 from-amber-400 to-green-500" size="sm">
      <CardHeader>
        <CardTitle>
          {t("app.download.osmNeedsSupport.title", { app: app.name })}
        </CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={hideSupportPanel}
            aria-label={t("close")}
          >
            <HugeiconsIcon strokeWidth={2} icon={Cancel01Icon} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="whitespace-pre-line">
        <p>{t("app.download.osmNeedsSupport", { app: app.name })}</p>
      </CardContent>
      <CardFooter className="flex-wrap gap-3">
        <Button size="xs" asChild>
          <ExternalLink
            href="https://wiki.openstreetmap.org/wiki/How_to_contribute"
            data-goatcounter-click="/osm/contribute"
            data-goatcounter-title="Goes to OpenStreetMap how to contribute page."
            data-goatcounter-referrer="https://osm-apps.org/"
            icon
          >
            {t("app.contribute.osm.spendTime")}
          </ExternalLink>
        </Button>
        <Button size="xs" asChild>
          <ExternalLink
            href="https://supporting.openstreetmap.org/donate/"
            data-goatcounter-click="/osm/donate"
            data-goatcounter-title="Goes to OpenStreetMap donate page."
            data-goatcounter-referrer="https://osm-apps.org/"
            icon
          >
            {t("app.contribute.osm.spendMoney")}
          </ExternalLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
