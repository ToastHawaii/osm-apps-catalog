import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { App } from "@shared/data/App";
import { useRoute } from "@hooks/useRoute";
import { useIsTechDomain } from "@hooks/useIsTechDomain";
import {
  DefaultTagsReorganization,
  tagsReorganizer,
  TechDefaultTagsReorganization,
} from "@lib/tagsReorganizer";

import { Score } from "@app/ui/components/Score";
import { AppLogo } from "@components/common/AppLogo";
import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardHeader } from "@components/ui/card";

import { useAppImages } from "@app/app/useAppImages";
import { Gallery } from "@app/app/Gallery";
import { plainText } from "@shared/utils/plainText";
import { ExternalLink } from "@components/common/ExternalLink";
import { newUrl } from "@shared/utils/url";
import { HugeiconsIcon } from "@hugeicons/react";
import { Share05Icon } from "@hugeicons/core-free-icons";

export function Details({ app }: { app: App }) {
  const { t } = useTranslation();
  const isTechView = useIsTechDomain();
  const routes = useRoute();

  const images = useAppImages(app);

  const tagItems = tagsReorganizer(
    app.tags,
    !isTechView ? DefaultTagsReorganization : TechDefaultTagsReorganization,
  );

  return (
    <div className="relative mx-auto max-w-3xl p-2 text-left">
      <Card className="shadow-md">
        <CardHeader className="flex flex-wrap items-center gap-4">
          <div className="size-25 place-items-center content-center">
            <AppLogo app={app} />
          </div>
          <h1 className="text-2xl font-semibold">{app.name}</h1>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {tagItems.map((tag) => (
              <Badge key={tag} variant="outline" asChild>
                <Link to={routes.search({ tags: [tag] })}>
                  {t(`app.tag.${tag}`)}
                </Link>
              </Badge>
            ))}
          </div>
          {images.length > 0 && <Gallery images={images} />}

          <p>
            <span
              dangerouslySetInnerHTML={{
                __html: app.description || app.subtitle || "",
              }}
            ></span>
            {app.documentation && (
              <>
                {plainText(app.description || app.subtitle || "")
                  ? plainText(app.description || app.subtitle || "").endsWith(
                      ".",
                    )
                    ? " "
                    : " – "
                  : ""}
                <ExternalLink href={app.documentation}>
                  {t("app.learnMore", {
                    website: newUrl(app.documentation).hostname,
                  })}{" "}
                  <HugeiconsIcon
                    className="inline-block"
                    icon={Share05Icon}
                    strokeWidth={2}
                    size={16}
                  />
                </ExternalLink>
              </>
            )}
          </p>
          
        </CardContent>
      </Card>
      <Score app={app} position="right" />
    </div>
  );
}
