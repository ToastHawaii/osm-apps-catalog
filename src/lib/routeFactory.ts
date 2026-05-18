import { toReadmeLanguage } from "@shared/lib/SupportedLanguages";
import { chain, isUndefined } from "lodash";

export type Params = Record<string, string | number | string[] | undefined>;

export interface Query {
  domain?: string;
  lang?: string;
}

export function routeFactory(domain?: string) {
  function build(
    view?: string,
  ): (params?: Query, options?: { full?: boolean }) => string;
  function build<T extends Params>(
    page?: string,
  ): (params: T & Query, options?: { full?: boolean }) => string;
  function build<T extends Params | undefined>(page?: string) {
    return (params: T & Query, options?: { full?: boolean }) => {
      const base = options?.full ? `${document.location.origin}/` : "/";

      const search = chain({ domain, page, ...params })
        .omitBy(isUndefined) // Remove undefined values
        .mapValues((v) => (Array.isArray(v) ? v.join("+") : "" + v))
        .toPairs()
        .thru((entries) => new URLSearchParams(entries as [string, string][]))
        .value()
        .toString();

      return search ? `${base}?${search}` : base;
    };
  }

  return {
    home: build<{ platforms?: string[]; app?: number }>(),
    app: build<{ app: number }>("app"),
    search: build<{
      platforms?: string[];
      tags?: string[];
      topics?: string[];
      search?: string;
      view?: "list" | "compare";
    }>("search"),
    list: build<{ platforms?: string[] }>("list"),
    compare: build<{ platforms?: string[] }>("compare"),
    explore: build<{ category: string; platforms?: string[] }>("explore"),
    docs: (query?: { lang?: string }) =>
      query?.lang && query?.lang.toLowerCase() !== "en"
        ? `/docs/${toReadmeLanguage(query.lang)}/`
        : "/docs/",
    docsScore: () => "/docs/score/",
  };
}
