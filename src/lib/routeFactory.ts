import { toReadmeLanguage } from "@shared/lib/SupportedLanguages";
import { chain, isUndefined } from "lodash";

export type Params = Record<string, string | number | string[] | undefined>;

export interface Query {
  domain?: string;
  lang?: string;
}

export function routeFactory(domain?: string) {
  function build(view?: string): (params?: Query) => string;
  function build<T extends Params>(
    view?: string,
  ): (params: T & Query) => string;
  function build<T extends Params | undefined>(view?: string) {
    return (params: T & Query) => {
      const search = chain({ domain, view, ...params })
        .omitBy(isUndefined) // Remove undefined values
        .mapValues((v) => (Array.isArray(v) ? v.join("+") : "" + v))
        .toPairs()
        .thru((entries) => new URLSearchParams(entries as [string, string][]))
        .value()
        .toString();

      return search ? `/?${search}` : "/";
    };
  }

  return {
    home: build<{ platforms?: string[] }>(),
    app: build<{ app: number }>("app"),
    search: build<{ platforms?: string[] }>("search"),
    list: build<{ platforms?: string[] }>("list"),
    compare: build<{ platforms?: string[] }>("compare"),
    explore: build<{ category: string; platforms?: string[] }>("explore"),
    docs: (query?: { lang?: string }) =>
      query?.lang && query?.lang.toLowerCase() !== "en"
        ? `/docs/${toReadmeLanguage(query.lang)}/`
        : "/docs/",
  };
}
