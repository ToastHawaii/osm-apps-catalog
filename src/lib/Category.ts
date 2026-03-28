import { TagsReorganizationDefinition } from "@lib/tagsReorganizer";
import { App } from "@shared/data/App";

export interface Category {
  id: string;
  name: () => string;
  description?: ((numberOfApps: number) => string) | undefined;
  getAll?: (() => App[]) | undefined;
  nextIndex: () => number;
  loadData?: () =>
    | {
        label: string;
        full: string;
      }
    | undefined;
  tagsReorganization?: TagsReorganizationDefinition;
}
