import { useSearchParams } from "react-router";
import { State } from "../app/ui/State";
import { useReducer } from "react";
import { languageValueToDisplay } from "../app/ui/utilities/language";
import { getUserRegion } from "../lib/utils/getUserRegion";
import { getUserOS } from "../lib/utils/getUserOS";
import { isEmpty, isEqual, pickBy, uniq } from "lodash";

function usersBrowserSearchParams() {
  const userLanguages = navigator.languages.map((l) =>
    languageValueToDisplay(l),
  );
  const userRegion = getUserRegion();
  const userPlatform = getUserOS();

  return {
    languages:
      userLanguages.length > 0
        ? uniq([languageValueToDisplay("en"), ...userLanguages]).join("+")
        : "",
    coverage: userRegion ? uniq(["Worldwide", userRegion]).join("+") : "",
    platforms: userPlatform ? uniq(["Web", userPlatform]).join("+") : "",
  };
}

export function useAppState() {
  let initState: {
    languages: string;
    coverage: string;
    platforms: string;
  } = { languages: "", coverage: "", platforms: "" };
  const [initSearchParams] = useSearchParams();

  if (isEmpty(Object.fromEntries(initSearchParams.entries()))) {
    initState = usersBrowserSearchParams();
  }

  const [searchParams, setSearchParams] = useSearchParams(
    pickBy(initState, (v) => v),
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
      },
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
          const search = searchParams.get("search");
          if (search) {
            setSearchParams(() => ({ search }));
          } else {
            setSearchParams(() => ({}));
          }
        }, 10);
        return;
      }
      const search = searchParams.get("search");
      if (search && category !== "focus") {
        setSearchParams(() => ({ search, category }));
      } else if (category) {
        setSearchParams(() => ({ category }));
      } else {
        setSearchParams(() => ({}));
      }
    },
    (key?: string) => {
      if (key) {
        return isEqual(
          [...Object.entries(usersBrowserSearchParams())].filter(
            (e) => e[0] === key,
          ),
          [...searchParams].filter((e) => e[0] === key),
        );
      }

      return isEqual(
        [...Object.entries(usersBrowserSearchParams())],
        [...searchParams].filter((e) => e[0] !== "search"),
      );
    },
  ] as const;
}
