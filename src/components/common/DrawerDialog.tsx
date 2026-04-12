import { JSX, PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";
import { Button } from "@components/ui/button";
import { useMediaQuery } from "@hooks/useMediaQuery";
import React from "react";
import { useTranslation } from "react-i18next";

export function DrawerDialog({
  title,
  description,
  trigger,
  children,
}: PropsWithChildren<{
  title: string;
  description: string;
  trigger: JSX.Element;
}>) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { t } = useTranslation();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {(!!title || !!description) && (
            <DialogHeader>
              {!!title && <DialogTitle>{title}</DialogTitle>}
              {!!description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        {(!!title || !!description) && (
          <DrawerHeader className="text-left">
            {!!title && <DrawerTitle>{title}</DrawerTitle>}
            {!!description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}
        <div className="px-4">{children}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{t("close")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
