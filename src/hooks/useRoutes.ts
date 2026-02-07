type Params = Record<string, string | number | string[] | undefined>;

type Result =
  | {
      pathname: string;
      search: string;
    }
  | {
      pathname: string;
      search?: undefined;
    };

function build(view: string): () => Result;
function build<T extends Params>(view: string): (params: T) => Result;
function build<T extends Params>(view: string) {
  return (params: T) => {
    const search = new URLSearchParams(
      (
        Object.entries(view ? { view, ...params } : params).filter(
          ([, v]) => v !== undefined,
        ) as [string, string | number | string[]][]
      )
        // convert to string
        .map(([k, v]) => [k, Array.isArray(v) ? v.join("+") : "" + v]),
    ).toString();

    return search ? { pathname: "/", search: `?${search}` } : { pathname: "/" };
  };
}

export function useRoutes() {
  return {
    home: build<{ platforms?: string[] }>(""),
    explore: build<{ category: string; platforms?: string[] }>("explore"),
    search: build<{ platforms?: string[] }>("search"),
    focus: build("focus"),
    app: build<{ app: number }>("app"),
  };
}
