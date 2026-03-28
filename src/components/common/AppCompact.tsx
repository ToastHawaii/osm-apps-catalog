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

function defaultTags(tags: string[]) {
  const prioritize = ["property.free"].reverse();
  const hierarchy = [
    ["feature.voice-guidance", "feature.navigation"],

    ["feature.edit-map", "feature.create-notes"],
    ["feature.offline-edit", "feature.edit-map"],

    ["feature.routing", "feature.routing-hike"],
    ["feature.routing", "feature.routing-motorbike"],
    ["feature.routing", "feature.routing-bike"],
    ["feature.routing", "feature.routing-car"],
    ["feature.routing", "feature.routing-foot"],
    ["feature.offline-routing", "feature.routing"],
  ];
  const hide = ["property.foss"];

  // prioritize
  let newTags = tags.slice();
  for (const p of prioritize) {
    const i = newTags.indexOf(p);
    if (i >= 0) {
      newTags.splice(i, 1);
      newTags.unshift(p);
    }
  }

  for (const h of hierarchy) {
    newTags.includes(h[0]);
    hide.push(h[1]);
  }

  // hide
  newTags = newTags.filter((t) => !hide.includes(t));

  return newTags;
}

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
              <TagList items={defaultTags(app.tags)} />
            </ItemFooter>
          )}
        </Link>
      </Item>
      {!!score && <Score app={app} position="right" />}
    </div>
  );
}
