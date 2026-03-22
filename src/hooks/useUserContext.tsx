import { languageCodeToDisplay } from "@app/ui/lib/language";
import { getUserRegion } from "@lib/utils/getUserRegion";

export interface UserContext {
  region: string | undefined;
  languages: string[];
}

export function useUserContext() {
  const userRegion = getUserRegion();

  const userLangs = navigator.languages.map((l) => languageCodeToDisplay(l));

  return {
    region: userRegion,
    languages: userLangs,
  };
}
