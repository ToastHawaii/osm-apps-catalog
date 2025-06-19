import { debounce } from "lodash";
import { useEffect } from "react";

const bindEvents = debounce(() => {
  if ((window as any).goatcounter && (window as any).goatcounter.bind_events)
    (window as any).goatcounter.bind_events();
}, 300);

export const useGoatCounterEvents = function () {
  useEffect(() => {
    bindEvents();
  });
};
