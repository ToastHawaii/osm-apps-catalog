import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { DrawerDialog } from "@components/common/DrawerDialog";
import { Button } from "@components/ui/button";
import { App } from "@shared/data/App";
import { Contribute } from "@app/app/Contribute";
import { featureFlags } from "../../../featureFlags";
import { DownloadSlide } from "@app/app/Download/DownloadSlide";
import { NeedsHelpSlide } from "@app/app/Download/NeedsHelpSlide";

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
              {t("app.download.skipButton")}
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
      {slide === 0 && (
        <NeedsHelpSlide app={app} onSupportClick={() => setSlide(1)} />
      )}

      {slide === 1 && <Contribute app={app} />}

      {slide === 2 && <DownloadSlide app={app} />}
    </DrawerDialog>
  );
}
