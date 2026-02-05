import { useSearchParams } from "react-router";
import { State } from "../app/ui/State";
import { useReducer } from "react";
import { getUserOS } from "../lib/utils/getUserOS";
import { isEmpty, isEqual, pickBy, uniq } from "lodash";

function usersBrowserSearchParams() {
  const userPlatform = getUserOS();

  return {
    platforms: userPlatform ? uniq(["Web", userPlatform]).join("+") : "",
  };
}

export function useAppState() {
  let initState: {
    platforms: string;
  } = { platforms: "" };
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
      view: searchParams.get("view") || "home",
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
        formatedValue = value === "home" ? "" : "" + value;
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
            setSearchParams(() => ({ view: "search", search }));
          } else {
            setSearchParams(() => ({ view: "search" }));
          }
        }, 10);
        return;
      }
      const search = searchParams.get("search");
      if (search && category !== "focus") {
        setSearchParams(() => ({ view: "search", search, category }));
      } else if (category) {
        setSearchParams(() => ({ view: "search", category }));
      } else {
        setSearchParams(() => ({ view: "search" }));
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
