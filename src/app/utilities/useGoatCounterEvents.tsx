import { debounce } from "lodash";
import { useEffect } from "react";

const bindEvents = debounce(() => {
  (window as any).goatcounter.bind_events();
}, 300);

export const useGoatCounterEvents = function () {
  useEffect(() => {
    bindEvents();
  });
};
