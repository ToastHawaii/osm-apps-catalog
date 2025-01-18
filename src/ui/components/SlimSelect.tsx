import React, { useEffect, useRef } from "react";
import SlimSelectClass, { Config } from "slim-select";

export function SlimSelect(
  props: {
    multiple?: boolean | undefined;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
  } & Omit<Config, "select">
) {
  const elementRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (elementRef.current)
      new SlimSelectClass({ ...props, select: elementRef.current });
  });

  return (
    <select
      ref={elementRef}
      className={props.className}
      style={props.style}
      multiple={props.multiple}
    ></select>
  );
}
