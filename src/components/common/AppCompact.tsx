import React from "react";
import { Link } from "react-router";

import { plainText } from "@shared/utilities/plainText";

import { App } from "@shared/data/App";

import { Logo } from "@app/ui/components/Image";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@components/ui/item";
import { useRoutes } from "@hooks/useRoutes";

export function AppCompact({ app }: { app: App }) {
  const routes = useRoutes();

  return (
    <div className="p-2">
      <Item variant="outline" asChild role="listitem">
        <Link to={routes.app({ app: app.id })}>
          <ItemMedia className="size-15">
            <Logo app={app} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1 wrap-anywhere">
              {app.name}
            </ItemTitle>
            <ItemDescription className="line-clamp-2 h-10 wrap-anywhere">
              {plainText(app.subtitle || app.descriptionShort || app.description)}
            </ItemDescription>
          </ItemContent>
        </Link>
      </Item>
    </div>
  );
}
