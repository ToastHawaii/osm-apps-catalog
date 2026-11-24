import React, { useEffect, useMemo, useRef, useState } from "react";
import { MediaWikiWidth, getMediaWikiSrcSet } from "@app/ui/lib/addWidthToMediaWikiUrls";

export function LazyImage(
  props: {
    dynamicSrc: string | undefined;
    expectedWidth: MediaWikiWidth;
    loadOnInit?: boolean | undefined;
  } & Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "style" | "className" | "alt"
  >,
) {
  const {
    dynamicSrc,
    expectedWidth,
    loadOnInit,
    src: fallbackSrc,
    style,
    ...imgProps
  } = props;

  // Candidates tried in order until one loads.
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

  // Remember candidates for which srcSet was rejected.
  const [srcSetDisabledFor, setSrcSetDisabledFor] = useState<string>();

  const elementRef = useRef<HTMLImageElement>(null);

  // Reset the candidate chain when dynamic sources change.
  useEffect(() => {
    setCandidateIndex(0);
    setLoadedDynamic(!dynamicSrc);
  }, [dynamicSrc]);

  const currentSrc =
    candidates[Math.min(candidateIndex, candidates.length - 1)];

  // Build a density-based srcSet for MediaWiki images.
  const srcSet = currentSrc
    ? getMediaWikiSrcSet(currentSrc, expectedWidth)
    : undefined;

  // Use either srcSet or src, never both.
  const useSrcSet = srcSet !== undefined && srcSetDisabledFor !== currentSrc;

  // Handle images that completed before the effect ran.
  useEffect(() => {
    const element = elementRef.current;

    if (element?.complete && element.naturalWidth > 0) {
      setLoadedDynamic(currentSrc !== fallbackSrc);
    }
  });

  function handleLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const img = event.currentTarget;

    if (useSrcSet) {
      const actualPixelWidth = img.naturalWidth * window.devicePixelRatio;

      const desiredPixelWidth = expectedWidth * window.devicePixelRatio;

      // MediaWiki returned an image smaller than requested.
      // Disable srcSet and load the original source instead.
      if (actualPixelWidth < desiredPixelWidth) {
        setSrcSetDisabledFor(currentSrc);
      }
    }

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
      src={useSrcSet ? undefined : currentSrc}
      srcSet={useSrcSet ? srcSet : undefined}
      style={loadedDynamic ? undefined : style}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
