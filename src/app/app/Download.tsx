import React from "react";

import { AppleStoreLink } from "@app/ui/components/links/download/AppleStoreLink";
import { AsinLink } from "@app/ui/components/links/download/AsinLink";
import { FDroidLink } from "@app/ui/components/links/download/FDroidLink";
import { GooglePlayLink } from "@app/ui/components/links/download/GooglePlayLink";
import { HuaweiAppGalleryLink } from "@app/ui/components/links/download/HuaweiAppGalleryLink";
import { MacAppStoreLink } from "@app/ui/components/links/download/MacAppStoreLink";
import { MicrosoftAppLink } from "@app/ui/components/links/download/MicrosoftAppLink";
import { ObtainiumLink } from "@app/ui/components/links/download/ObtainiumLink";
import { SourceCodeLink } from "@app/ui/components/links/download/SourceCodeLink";
import { WebsiteLink } from "@app/ui/components/links/download/WebsiteLink";
import { DrawerDialog } from "@components/common/DrawerDialog";
import { Button } from "@components/ui/button";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { some } from "lodash";
import { getUserOS } from "@lib/utils/getUserOS";
import { ExternalLink } from "@components/common/ExternalLink";
import { Card, CardContent, CardFooter } from "@components/ui/card";

export function Download({ app }: { app: App }) {
  const { t } = useTranslation();

  const userOS = getUserOS();

  return (
    <DrawerDialog
      trigger={<Button>{t("app.download")}</Button>}
      title={app.name}
      description="Before you continue"
    >
      {app.libre ? (
        <Card className="bg-linear-110 from-yellow-300 to-pink-500" size="sm">
          <CardContent className="whitespace-pre-line">
            {t("app.download.libreSoftwareNeedsSupport", { app: app.name })}
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-linear-110 from-amber-400 to-green-500" size="sm">
          <CardContent className="whitespace-pre-line">
            <p>{t("app.download.osmNeedsSupport", { app: app.name })}</p>
          </CardContent>
          <CardFooter className="gap-3">
            <Button size="xs" variant="default" asChild>
              <ExternalLink
                href="https://wiki.openstreetmap.org/wiki/How_to_contribute"
                icon
              >
                {t("app.contribute.osm.spendTime")}
              </ExternalLink>
            </Button>
            <Button size="xs" variant="default" asChild>
              <ExternalLink
                href="https://supporting.openstreetmap.org/donate/"
                icon
              >
                {t("app.contribute.osm.spendMoney")}
              </ExternalLink>
            </Button>
          </CardFooter>
        </Card>
      )}

      <div>
        {(!!app.website || some(app.install) || !!app.sourceCode) && (
          <span className="downloads">{t("app.getIt")}</span>
        )}
        <WebsiteLink app={app} />
        {(!userOS || userOS === "Android") && (
          <>
            <FDroidLink app={app} />
            <ObtainiumLink app={app} />
            <GooglePlayLink app={app} />
            <AsinLink app={app} />
            <HuaweiAppGalleryLink app={app} />
          </>
        )}
        {(!userOS || userOS === "iOS") && <AppleStoreLink app={app} />}

        {(!userOS || userOS === "MacOS") && <MacAppStoreLink app={app} />}
        {(!userOS || userOS === "Windows") && <MicrosoftAppLink app={app} />}
        {!app.website && !some(app.install) && !!app.sourceCode && (
          <SourceCodeLink app={app} />
        )}
      </div>
    </DrawerDialog>
  );
}
