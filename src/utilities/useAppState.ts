import { useSearchParams } from "react-router";
import { State } from "../State";
import { useReducer } from "react";
import { languageValueToDisplay } from "../ui/utilities/language";
import { getUserRegion } from "./getUserRegion";
import { getUserOS } from "./getUserOS";
import { isEmpty, isEqual, pickBy, uniq } from "lodash";

export function useAppState() {
  let initState: {
    languages: string[];
    coverage: string[];
    platforms: string[];
  } = { languages: [], coverage: [], platforms: [] };
  const [initSearchParams] = useSearchParams();

  if (isEmpty(Object.fromEntries(initSearchParams.entries()))) {
    const userLanguages = navigator.languages.map((l) =>
      languageValueToDisplay(l)
    );
    const userRegion = getUserRegion();
    const userPlatform = getUserOS();

    initState = {
      languages:
        userLanguages.length > 0
          ? uniq([languageValueToDisplay("en"), ...userLanguages])
          : [],
      coverage: userRegion ? uniq(["Worldwide", userRegion]) : [],
      platforms: userPlatform ? uniq(["Web", userPlatform]) : [],
    };
  }

  const [searchParams, setSearchParams] = useSearchParams(
    pickBy(
      {
        languages: initState.languages.join("+"),
        coverage: initState.coverage.join("+"),
        platforms: initState.platforms.join("+"),
      },
      (v) => v
    )
  );
  const [, forceRerender] = useReducer((x) => x + 1, 0);

  const app = searchParams.get("app")
    ? parseInt(searchParams.get("app") || "", 10)
    : undefined;

  return [
    {
      lang: searchParams.get("lang") || "",
      app: searchParams.get("app")
        ? parseInt(searchParams.get("app") || "", 10)
        : undefined,
      search: searchParams.get("search") || "",
      topics: searchParams.get("topics")?.split("+") || [],
      platforms: searchParams.get("platforms")?.split("+") || [],
      languages: searchParams.get("languages")?.split("+") || [],
      coverage: searchParams.get("coverage")?.split("+") || [],
      contribute: searchParams.get("contribute")?.split("+") || [],
      category: !app ? searchParams.get("category") || "all" : "",
      view: searchParams.get("view") === "compare" ? "compare" : "list",
    } as State,
    function (
      key: string,
      value: number | string | string[],
      option?: {
        forceUpdate?: boolean | undefined;
        skipUrlUpdate?: boolean | undefined;
      }
    ) {
      let formatedValue;
      if (Array.isArray(value)) {
        formatedValue = value.join("+");
      } else if (key === "lang") {
        formatedValue = value === "en" ? "" : "" + value;
      } else if (key === "category") {
        formatedValue = value === "all" ? "" : "" + value;
      } else if (key === "view") {
        formatedValue = value === "list" ? "" : "" + value;
      } else {
        formatedValue = "" + value;
      }
      if (formatedValue) {
        if (searchParams.get(key) === formatedValue && !option?.forceUpdate) {
          return;
        }
        searchParams.set(key, formatedValue);
      } else {
        if (!searchParams.has(key) && !option?.forceUpdate) {
          return;
        }
        searchParams.delete(key);
      }
      if (!option?.skipUrlUpdate) {
        setSearchParams(searchParams);
      } else {
        forceRerender();
      }
    },
    function (category: string) {
      if (category === "all") {
        setSearchParams(() => searchParams);
        setTimeout(() => {
          setSearchParams(() => ({}));
        }, 10);
        return;
      }
      setSearchParams({
        category,
      });
    },
    () => !isEqual([...initSearchParams], [...searchParams]),
  ] as const;
}
