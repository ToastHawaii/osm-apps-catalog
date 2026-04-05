import React from "react";
import { useTranslation } from "react-i18next";

import { useSearchState } from "@hooks/useSearchState";
import { Button } from "@components/ui/button";

export function NoResults() {
  const { t } = useTranslation();

  const [state, , resetState] = useSearchState();

  return (
    <>
      <meta name="robots" content="noindex" />
      <p className="col-span-full my-4 pt-4 text-center text-4xl text-muted-foreground">
        {t("noResults")}
        <br />
        {(state.tags.length > 0 ||
          state.topics.length > 0 ||
          state.languages.length > 0 ||
          state.platforms.length > 0 ||
          state.programmingLanguages.length > 0 ||
          state.coverage.length > 0 ||
          state.contribute.length > 0) && (
          <Button
            variant="secondary"
            onClick={() => resetState(state.category)}
          >
            {t("filter.resetFilters")}
          </Button>
        )}
      </p>
    </>
  );
}
