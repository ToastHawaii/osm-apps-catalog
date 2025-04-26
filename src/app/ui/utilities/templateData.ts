import { LocalizedValue } from "./getLocalizedValue";

import * as td from "./templateData.json";

export const templateData: {
  params: {
    [param: string]: {
      label?: LocalizedValue;
      type?: string;
      required?: boolean;
      suggested?: boolean;
      description?: LocalizedValue;
      example?: LocalizedValue;
      default?: string;
      autovalue?: string;
      suggestedvalues?: string[];
      aliases?: string[];
      deprecated?: boolean;
    };
  };
  paramOrder: string[];
  format?: string;
  description?: LocalizedValue;
} = td;
