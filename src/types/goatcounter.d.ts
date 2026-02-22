// Copy from https://github.com/caleb531/goatcounter-js/blob/main/src/index.ts
export {};

// The type for the goatcounter global variable
interface GoatCounter {
  count: (vars: GoatCounterDataParameters) => void;
  url: (vars: GoatCounterDataParameters) => void;
  filter: () => string | false;
  bind_events: () => void;
  get_query: (name: string) => string | null;
}
declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

// The data parameters that can be passed to goatcounter.count() or
// goatcountre.url(); see
// <https://www.goatcounter.com/help/js#data-parameters-418>
interface GoatCounterDataParameters {
  path?: string;
  title?: string;
  referrer?: string;
  event?: boolean;
}
