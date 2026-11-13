import React from "react";
import { useTranslation } from "react-i18next";
import { useRoute } from "@hooks/useRoute";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { linkVariants } from "@components/common/ExternalLink";

export function NotFound() {
  const { t } = useTranslation();
  const routes = useRoute();

  return (
    <>
      <title>{`404 – OSM Apps Catalog`}</title>
      <meta name="description" content={t("pageNotFound.title")} />
      <meta name="robots" content="noindex" />
      <main className="mx-auto mt-8 flex max-w-sm flex-col justify-items-center gap-4 text-center">
        <h1 className="text-lg font-semibold text-muted-foreground">404</h1>
        <h2 className="mt-8 text-2xl font-semibold">
          {t("pageNotFound.title")}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
          {t("pageNotFound.description")}
        </p>
        <div>
          <a
            href={routes.home()}
            className={buttonVariants({
              variant: "default",
              className: "w-3xs",
            })}
          >
            {t("pageNotFound.discoverApps")}
          </a>
        </div>
        <div>
          <a
            href={routes.search()}
            className={buttonVariants({
              variant: "secondary",
              className: "w-3xs",
            })}
          >
            {t("pageNotFound.search")}
          </a>
        </div>
        <a
          href={routes.docs.feedback()}
          className={cn(
            linkVariants({ variant: "default", className: "text-sm" }),
          )}
        >
          {t("pageNotFound.feedbackButton")}
        </a>
      </main>
    </>
  );
}
