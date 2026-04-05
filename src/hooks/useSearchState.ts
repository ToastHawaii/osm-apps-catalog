import { useSearchParams } from "react-router";
import { State } from "../app/ui/State";
import { getUserOS } from "../lib/utils/getUserOS";
import { isEmpty, isEqual, pickBy, uniq } from "lodash";

function getBrowserContext() {
  const userPlatform = getUserOS();

  return {
    platforms: userPlatform ? uniq(["Web", userPlatform]).join("+") : "",
  };
}

export function useSearchState() {
  let initState: {
    platforms: string;
  } = { platforms: "" };
  const [initSearchParams] = useSearchParams();

  if (isEmpty(Object.fromEntries(initSearchParams.entries()))) {
    initState = getBrowserContext();
  }

  const [searchParams, setSearchParams] = useSearchParams(
    pickBy(initState, (v) => v),
  );

  return [
    {
      lang: searchParams.get("lang") || "",
      search: searchParams.get("search") || "",
      tags: searchParams.get("tags")?.split("+") || [],
      topics: searchParams.get("topics")?.split("+") || [],
      languages: searchParams.get("languages")?.split("+") || [],
      platforms: searchParams.get("platforms")?.split("+") || [],
      programmingLanguages:
        searchParams.get("programmingLanguages")?.split("+") || [],
      coverage: searchParams.get("coverage")?.split("+") || [],
      contribute: searchParams.get("contribute")?.split("+") || [],
      category: searchParams.get("category") || "all",
      view: searchParams.get("view") || "list",
    } as State,
    function (
      key: string,
      value: number | string | string[],
      option?: {
        replace?: boolean | undefined;
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
        searchParams.set(key, formatedValue);
      } else {
        searchParams.delete(key);
      }

      setSearchParams(searchParams, { replace: option?.replace });
    },
    function (category: string) {
      if (category === "all") {
        setSearchParams(() => searchParams);
        setTimeout(() => {
          const search = searchParams.get("search");
          if (search) {
            setSearchParams(() => ({ page: "search", search }));
          } else {
            setSearchParams(() => ({ page: "search" }));
          }
        }, 10);
        return;
      }
      const search = searchParams.get("search");
      if (search && category !== "focus") {
        setSearchParams(() => ({ page: "search", search, category }));
      } else if (category) {
        setSearchParams(() => ({ page: "search", category }));
      } else {
        setSearchParams(() => ({ page: "search" }));
      }
    },
    (key?: string) => {
      if (key) {
        return isEqual(
          [...Object.entries(getBrowserContext())].filter((e) => e[0] === key),
          [...searchParams].filter((e) => e[0] === key),
        );
      }

      return isEqual(
        [...Object.entries(getBrowserContext())],
        [...searchParams].filter((e) => e[0] !== "search"),
      );
    },
  ] as const;
}
