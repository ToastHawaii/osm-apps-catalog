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
      if (Array.isArray(value)) {
        setSearchParams({ [key]: value.join(",") });
      } else if (key === "lang") {
        setSearchParams({ [key]: value === "en" ? "" : "" + value });
      } else if (key === "category") {
        setSearchParams({ [key]: value === "all" ? "" : "" + value });
      } else if (key === "view") {
        setSearchParams({ [key]: value === "list" ? "" : "" + value });
      } else {
        setSearchParams({ [key]: "" + value });
      }
    },
    function (category: string) {
      setSearchParams({
        search: "",
        topics: "",
        platforms: "",
        languages: "",
        coverage: "",
        category,
        view: "",
      });
    },
  ] as const;
}
