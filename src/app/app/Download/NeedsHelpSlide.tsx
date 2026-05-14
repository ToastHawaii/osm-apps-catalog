import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import { App } from "@shared/data/App";
import { ExternalLink } from "@components/common/ExternalLink";

export function NeedsHelpSlide({
  app,
  onSupportClick,
}: {
  app: App;
  onSupportClick: () => void;
}): React.ReactNode {
  const { t } = useTranslation();

  return app.libre ? (
    <>
      <Card className="bg-linear-110 from-yellow-300 to-pink-500" size="sm">
        <CardContent className="whitespace-pre-line">
          {t("app.download.libreSoftwareNeedsSupport", { app: app.name })}
        </CardContent>
        <CardFooter className="gap-3">
          <Button size="xs" onClick={onSupportClick}>
            {t("app.contribute.app.spendTime", { app: app.name })}
          </Button>
        </CardFooter>
      </Card>

      {/* <Button size="xs" asChild>
                <ExternalLink href="" icon>
                  Donate money
                </ExternalLink>
              </Button> */}
    </>
  ) : (
    <Card className="bg-linear-110 from-amber-400 to-green-500" size="sm">
      <CardContent className="whitespace-pre-line">
        <p>{t("app.download.osmNeedsSupport", { app: app.name })}</p>
      </CardContent>
      <CardFooter className="gap-3">
        <Button size="xs" asChild>
          <ExternalLink
            href="https://wiki.openstreetmap.org/wiki/How_to_contribute"
            icon
          >
            {t("app.contribute.osm.spendTime")}
          </ExternalLink>
        </Button>
        <Button size="xs" asChild>
          <ExternalLink
            href="https://supporting.openstreetmap.org/donate/"
            icon
          >
            {t("app.contribute.osm.spendMoney")}
          </ExternalLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
