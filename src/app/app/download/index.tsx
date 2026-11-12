import React from "react";
import { useTranslation } from "react-i18next";

import { DownloadSlide } from "@app/app/download/DownloadSlide";
import { DrawerDialog } from "@components/common/DrawerDialog";
import { Button } from "@components/ui/button";
import { App } from "@shared/data/App";

export function Download({ app }: { app: App }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  return (
    <DrawerDialog
      size="lg"
      trigger={<Button>{t("app.download.button")}</Button>}
      title={app.name}
      description={t("app.download.downloadSlide.description")}
      onOpenChange={setOpen}
      open={open}
    >
      <DownloadSlide app={app} onDownloadClick={() => setOpen(false)} />
    </DrawerDialog>
  );
}
