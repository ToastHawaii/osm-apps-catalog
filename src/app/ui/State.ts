export interface State {
  lang: string;
  category: "" | "all" | "focus" | "latest" | "mobile" | "navigation" | "edit";
  search: string;
  topics: string[];
  languages: string[];
  platforms: string[];
  programmingLanguages: string[];
  coverage: string[];
  contribute: string[];
  view: "home" | "category" | "app" | "list" | "compare" | "search" | "focus";
}
