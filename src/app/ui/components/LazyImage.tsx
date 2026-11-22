import React, { useEffect, useMemo, useRef, useState } from "react";

export function LazyImage(
  props: {
    dynamicSrc: string | undefined;
    loadOnInit?: boolean | undefined;
  } & Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "style" | "className" | "alt"
  >,
) {
  const {
    dynamicSrc,
    loadOnInit,
    src: fallbackSrc,
    style,
    ...imgProps
  } = props;

  // Candidates tried in order until one loads: the dynamic sources first,
  // then the static `src` fallback. The browser decides when to actually
  // request them via `loading="lazy"`, the chain is resolved on `onError`.
  const dynamicCandidates = useMemo(
    () => (dynamicSrc || "").split(" ").filter(Boolean),
    [dynamicSrc],
  );
  const candidates = useMemo(
    () =>
      fallbackSrc ? [...dynamicCandidates, fallbackSrc] : dynamicCandidates,
    [dynamicCandidates, fallbackSrc],
  );

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [loadedDynamic, setLoadedDynamic] = useState(!dynamicSrc);
  const elementRef = useRef<HTMLImageElement>(null);

  // Reset the candidate chain when the dynamic sources change.
  useEffect(() => {
    setCandidateIndex(0);
    setLoadedDynamic(!dynamicSrc);
  }, [dynamicSrc]);

  const currentSrc =
    candidates[Math.min(candidateIndex, candidates.length - 1)];

  // onLoad does not fire for images that completed before the effect ran
  // (e.g. restored from cache), so check for that as well.
  useEffect(() => {
    const element = elementRef.current;
    if (element?.complete && element.naturalWidth > 0) {
      const attr = element.getAttribute("src");
      setLoadedDynamic((attr ?? undefined) !== fallbackSrc);
    }
  });

  function handleLoad() {
    setLoadedDynamic(currentSrc !== fallbackSrc);
  }

  function handleError() {
    setCandidateIndex((i) => Math.min(i + 1, candidates.length - 1));
  }

  return (
    <img
      ref={elementRef}
      {...imgProps}
      loading={loadOnInit ? "eager" : "lazy"}
      src={currentSrc}
      style={loadedDynamic ? undefined : style}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
