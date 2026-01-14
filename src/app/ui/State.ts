export interface State {
  lang: string;
  category: "" | "all" | "focus" | "latest" | "mobile" | "navigation" | "edit";
  app?: number | undefined;
  search: string;
  topics: string[];
  platforms: string[];
  languages: string[];
  coverage: string[];
  contribute: string[];
  view: "list" | "compare";
}
