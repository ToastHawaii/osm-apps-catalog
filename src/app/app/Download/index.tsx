import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { DrawerDialog } from "@components/common/DrawerDialog";
import { Button } from "@components/ui/button";
import { App } from "@shared/data/App";
import { ExternalLink } from "@components/common/ExternalLink";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import { Contribute } from "@app/app/Contribute";
import { featureFlags } from "../../../featureFlags";
import { DownloadSlide } from "@app/app/Download/DownloadSlide";

export function Download({ app }: { app: App }) {
  const { t } = useTranslation();

  const [slide, setSlide] = useState(
    featureFlags.showContributeOptions ? 0 : 2,
  );

  return (
    <DrawerDialog
      size="lg"
      trigger={<Button>{t("app.download.button")}</Button>}
      title={app.name}
      description={
        slide === 0
          ? t("app.download.needsHelpSlide.description")
          : slide === 1
            ? t("app.download.contributeSlide.description")
            : t("app.download.downloadSlide.description")
      }
      actions={
        <>
          {slide !== 2 && (
            <Button onClick={() => setSlide(2)}>
              Continue to Download/Visit
            </Button>
          )}
        </>
      }
      onOpenChange={(open) => {
        if (open) {
          setSlide(featureFlags.showContributeOptions ? 0 : 2);
        }
      }}
    >
      {slide === 0 &&
        (app.libre ? (
          <>
            <Card
              className="bg-linear-110 from-yellow-300 to-pink-500"
              size="sm"
            >
              <CardContent className="whitespace-pre-line">
                {t("app.download.libreSoftwareNeedsSupport", { app: app.name })}
              </CardContent>
              <CardFooter className="gap-3">
                <Button size="xs" onClick={() => setSlide(1)}>
                  Support {app.name}
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
        ))}

      {slide === 1 && <Contribute app={app} />}

      {slide === 2 && <DownloadSlide app={app} />}
    </DrawerDialog>
  );
}
