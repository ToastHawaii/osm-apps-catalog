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
import TagList from "@components/common/TagList";

export function AppCompact({
  app,
  tags,
  score,
}: {
  app: App;
  score?: boolean;
  tags?: boolean;
}) {
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
              <TagList items={app.tags} />
            </ItemFooter>
          )}
        </Link>
      </Item>
      {!!score && <Score app={app} position="right" />}
    </div>
  );
}
