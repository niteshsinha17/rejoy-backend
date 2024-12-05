import { CSSProperties, ReactNode, useEffect, useRef } from "react";

interface IInfiniteScrollProps {
  gap?: CSSProperties["gap"];
  rowCount: number;
  windowScroll?: boolean;
  rowRenderer: (index: number) => JSX.Element;
  fetchMore: () => void;
  hasMore: boolean;
  children?: ReactNode;
}

const InfiniteScroll = ({ gap = 10, rowCount, windowScroll = false, rowRenderer, fetchMore, hasMore, ...props }: IInfiniteScrollProps) => {
  const observable = useRef(null);
  const container = useRef(null);
  const lastFetchedRow = useRef(0);

  const handleObserver = () => {
    if (!hasMore || lastFetchedRow.current === rowCount) return;
    fetchMore();
    lastFetchedRow.current = rowCount;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (e) => {
        e.forEach((entry) => {
          if (entry.isIntersecting) {
            handleObserver();
          }
        });
      },
      {
        root: windowScroll ? null : container.current,
      }
    );

    if (observable.current) {
      observer.observe(observable.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [windowScroll, rowCount, hasMore, handleObserver]);

  return (
    <div
      className="h-full flex flex-col"
      style={{
        gap: gap,
      }}
      ref={container}
    >
      {Array.from({ length: rowCount }).map((_, index) => {
        return (
          <div
            key={index}
            className="flex-1"
          >
            {rowRenderer(index)}
          </div>
        );
      })}
      {props.children}
      {rowCount > 0 && <div ref={observable}></div>}
    </div>
  );
};

export default InfiniteScroll;
