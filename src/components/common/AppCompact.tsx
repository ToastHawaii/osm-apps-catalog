import React from "react";
import { Link } from "react-router";

import { plainText } from "@shared/utils/plainText";

import { App } from "@shared/data/App";

import { AppLogo } from "./AppLogo";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@components/ui/item";
import { useRoute } from "@hooks/useRoute";
import { Score } from "@app/ui/components/Score";
import { Badge } from "@components/ui/badge";
import { useTranslation } from "react-i18next";
import { take } from "lodash";

export function AppCompact({
  app,
  tags,
  score,
}: {
  app: App;
  score?: boolean;
  tags?: boolean;
}) {
  const { t } = useTranslation();
  const routes = useRoute();

  return (
    <div className="relative p-2">
      <Item
        variant="outline"
        asChild
        role="listitem"
        className="h-full shadow-md"
      >
        <Link to={routes.app({ app: app.id })}>
          <ItemMedia className="size-15">
            <AppLogo app={app} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1 wrap-anywhere">
              {app.name}
            </ItemTitle>
            <ItemDescription className="line-clamp-2 h-10 wrap-anywhere">
              {plainText(
                app.subtitle || app.descriptionShort || app.description,
              )}
            </ItemDescription>
          </ItemContent>
          {!!tags && (
            <ItemFooter className="overflow-hidden">
              <div className="flex gap-2">
                {take(app.tags, 3).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {t(`app.tag.${tag}`)}
                  </Badge>
                ))}
                {app.tags.length > 3 && <Badge variant="outline">...</Badge>}
              </div>
            </ItemFooter>
          )}
        </Link>
      </Item>
      {!!score && <Score app={app} position="right" />}
    </div>
  );
}
