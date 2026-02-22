import { debounce } from "lodash";
import { useEffect } from "react";

const bindEvents = debounce(() => {
  if (window.goatcounter) {
    window.goatcounter.bind_events();
  }
}, 300);

export const useGoatCounterEvents = function () {
  useEffect(() => {
    bindEvents();
  });
};
