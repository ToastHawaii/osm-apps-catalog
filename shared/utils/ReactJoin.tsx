import React, { ReactNode } from "react";

export function ReactJoin(
  elements: ReactNode[],
  separator: ReactNode = <>, </>,
): ReactNode | null {
  const notEmptyElements = elements.filter((v) => v);
  if (notEmptyElements.length === 0) {
    return null;
  }
  return (
    <>
      {notEmptyElements.reduce((prev, curr) => [prev, separator, curr] as any)}
    </>
  );
}
