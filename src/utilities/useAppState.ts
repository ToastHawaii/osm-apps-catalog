import { useSearchParams } from "react-router";
import { State } from "../State";

export function useAppState() {
  const [searchParams, setSearchParams] = useSearchParams();

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
      category: searchParams.get("category") || "all",
      view: searchParams.get("view") === "compare" ? "compare" : "list",
    } as State,
    function (key: string, value: number | string | string[]) {
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
        searchParams.set(key, formatedValue);
      } else {
        searchParams.delete(key);
      }
      setSearchParams(searchParams);
    },
    function (category: string) {
      if(category === "all"){setSearchParams({})}
      setSearchParams({
        category,
      });
    },
  ] as const;
}
