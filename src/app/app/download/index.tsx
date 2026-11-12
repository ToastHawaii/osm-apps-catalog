import React from "react";
import { useTranslation } from "react-i18next";

import { DownloadSlide } from "@app/app/download/DownloadSlide";
import { DrawerDialog } from "@components/common/DrawerDialog";
import { Button } from "@components/ui/button";
import { App } from "@shared/data/App";

export function Download({ app }: { app: App }) {
  const { t } = useTranslation();

  return (
    <DrawerDialog
      size="lg"
      trigger={<Button>{t("app.download.button")}</Button>}
      title={app.name}
      description={t("app.download.downloadSlide.description")}
    >
      <DownloadSlide app={app} />
    </DrawerDialog>
  );
}
