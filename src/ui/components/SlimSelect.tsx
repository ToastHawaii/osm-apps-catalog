import React, { useEffect, useRef, useState } from "react";
import SlimSelectClass, { Config } from "slim-select";

export function SlimSelect(
  props: {
    multiple?: boolean | undefined;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    selected?: string[] | undefined;
  } & Omit<Config, "select">
) {
  const elementRef = useRef<HTMLSelectElement>(null);
  const [instance, setInstance] = useState<SlimSelectClass>();

  useEffect(() => {
    if (elementRef.current && !instance) {
      console.info("b");
      setInstance(
        new SlimSelectClass({ ...props, select: elementRef.current })
      );
    }
    if (instance) {
      if (props.data) instance.setData(props.data);
      if (props.selected) instance.setSelected(props.selected, false);
    }
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
