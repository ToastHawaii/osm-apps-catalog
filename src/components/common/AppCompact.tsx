import React from "react";
import { Link } from "react-router";

import { plainText } from "@shared/utils/plainText";

import { App } from "@shared/data/App";

import { AppLogo } from "./AppLogo";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@components/ui/item";
import { useRoute } from "@hooks/useRoute";

export function AppCompact({ app }: { app: App }) {
  const routes = useRoute();

  return (
    <div className="p-2">
      <Item variant="outline" asChild role="listitem" className="shadow-md">
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
        </Link>
      </Item>
    </div>
  );
}
