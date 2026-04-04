import { Badge } from "@components/ui/badge";
import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

export default function TagList({ items }: { items: string[] }) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [heightIsCalculated, setHeightIsCalculated] = useState(false);

  useLayoutEffect(() => {
    if (heightIsCalculated) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];

    const rows: number[][] = [];
    let currentTop: number;

    // remove placeholder
    children.splice(3, 1);
    // check items part of the first two rows
    children.forEach((child, index) => {
      const top = child.offsetTop;

      if (currentTop === undefined) {
        currentTop = top;
        rows.push([index]);
      } else if (top === currentTop) {
        rows[rows.length - 1].push(index);
      } else {
        currentTop = top;
        rows.push([index]);
      }
    });

    // Keep only first 2 rows
    const visibleIndexes = rows.slice(0, 2).flat();
    setVisibleCount(visibleIndexes.length);
    setHeightIsCalculated(true);
  }, [items, heightIsCalculated]);

  useEffect(() => {
    // handel resize the window
    const handleResize = () => {
      setVisibleCount(items.length);
      setHeightIsCalculated(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const visibleItems = items.slice(0, visibleCount);
  const hiddenCount = items.length - visibleCount;

  return (
    <div className="relative flex flex-wrap gap-2" ref={containerRef}>
      {visibleItems.map((tag, index) => (
        <Fragment key={tag}>
          <Badge variant="outline">{t(`app.tag.${tag}`)}</Badge>
          {/* Add a placeholder for "..." to make it part of the height calculation */}
          {index === 3 && !heightIsCalculated && (
            <Badge variant="outline">...</Badge>
          )}
        </Fragment>
      ))}

      {heightIsCalculated && hiddenCount > 0 && (
        <Badge variant="outline">...</Badge>
      )}
    </div>
  );
}
