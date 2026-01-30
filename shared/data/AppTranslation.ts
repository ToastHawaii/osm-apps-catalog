import { App } from "@shared/data/App";

export type AppTranslation = Pick<
  App,
  | "id"
  | "name"
  | "description"
  | "descriptionShort"
  | "documentation"
  | "community"
  | "source"
>;
