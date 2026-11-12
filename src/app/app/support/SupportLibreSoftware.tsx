import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { App } from "@shared/data/App";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDownloadTracking } from "@hooks/useDownloadTracking";

export function SupportLibreSoftware({ app }: { app: App }) {
  const { t } = useTranslation();
  const { hideSupportPanel } = useDownloadTracking();

  return (
    <Card className="bg-linear-110 from-yellow-300 to-pink-500" size="sm">
      <CardHeader>
        <CardTitle>
          {t("app.download.libreSoftwareNeedsSupport.title", { app: app.name })}
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
        {t("app.download.libreSoftwareNeedsSupport", { app: app.name })}
      </CardContent>
    </Card>
  );
}
