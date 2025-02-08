import { useSearchParams } from "react-router";
import { State } from "../State";
import { useReducer } from "react";

export function useAppState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [, forceRerender] = useReducer((x) => x + 1, 0);

  return [
    {
      lang: searchParams.get("lang") || "",
      app: searchParams.get("app")
        ? parseInt(searchParams.get("app") as string, 10)
        : undefined,
      search: searchParams.get("search") || "",
      topics: searchParams.get("topics")?.split(",") || [],
      platforms: searchParams.get("platforms")?.split(",") || [],
      languages: searchParams.get("languages")?.split(",") || [],
      coverage: searchParams.get("coverage")?.split(",") || [],
      contribute: searchParams.get("contribute") || "",
      category: searchParams.get("category") || "all",
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
        formatedValue = value.join(",");
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
        setSearchParams({});
      }
      setSearchParams({
        category,
      });
    },
  ] as const;
}
