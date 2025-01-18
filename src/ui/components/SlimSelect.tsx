import React, { useEffect, useRef } from "react";
import SlimSelectClass, { Config } from "slim-select";

export function SlimSelect(
  props: { className?: string | undefined } & Omit<Config, "select">
) {
  const elementRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (elementRef.current)
      new SlimSelectClass({ ...props, select: elementRef.current });
  });

  return (
    <select
      ref={elementRef}
      style={{ width: "228px", float: "right", margin: "4px" }}
    ></select>
  );
}
