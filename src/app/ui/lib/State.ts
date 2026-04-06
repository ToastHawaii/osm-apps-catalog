export interface State {
  lang: string;
  category: "" | "all" | "focus" | "latest" | "mobile" | "navigation" | "edit";
  search: string;
  tags: string[];
  topics: string[];
  languages: string[];
  platforms: string[];
  programmingLanguages: string[];
  coverage: string[];
  contribute: string[];
  view: "list" | "compare";
}
