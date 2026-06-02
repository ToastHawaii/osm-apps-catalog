import { JSX, PropsWithChildren } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  actions,
  size,
  onOpenChange,
}: PropsWithChildren<{
  title?: string | undefined;
  description?: string | undefined;
  trigger: JSX.Element;
  actions?: JSX.Element | undefined;
  size?: "lg" | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
}>) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { t } = useTranslation();

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          onOpenChange?.(open);
        }}
      >
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className={size === "lg" ? "max-w-[752px]! min-w-auto" : "max-w-110"}
        >
          {(!!title || !!description) && (
            <DialogHeader>
              {!!title && <DialogTitle>{title}</DialogTitle>}
              {!!description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          <div className="-mx-4 max-h-[calc(90vh-176px)] overflow-y-auto px-4">
            {children}
          </div>
          <DialogFooter>
            {actions}
            <DialogClose asChild>
              <Button variant="outline">{t("close")}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        onOpenChange?.(open);
      }}
    >
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
        <div className="no-scrollbar overflow-y-auto px-4">{children}</div>
        <DrawerFooter>
          {actions}
          <DrawerClose asChild>
            <Button variant="outline">{t("close")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
