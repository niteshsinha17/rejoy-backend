"use client";
import { BoxLoader } from "@/components";
import { AppRoutes } from "@/enum";
import { ListOutlineIcon } from "@/icons";
import { IThreadListItem } from "@/models/ask";
import { rejoyAiApi } from "@/services/rejoy-ai.service";
import InfiniteScroll from "@/ui/infinite-scroll";
import { getFilledRoutes } from "@/utils";
import { timeAgo } from "@/utils/date-formatter";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface ILoaderProps {
  rowCount?: number;
}

const Loader = ({ rowCount = 1 }: ILoaderProps) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <BoxLoader
          key={index}
          height={50}
        />
      ))}
    </>
  );
};

const LibraryView = () => {
  const [getThreads, threadListQuery] = rejoyAiApi.useLazyThreadListQuery();
  const [threads, setThreads] = useState<IThreadListItem[]>([]);

  const fetchThread = (offset: number) => {
    if (offset === 0) {
      setThreads([]);
    }

    getThreads({ offset, limit: 10 })
      .unwrap()
      .then((response) => {
        setThreads([...threads, ...response.results]);
      });
  };

  const getInnerText = useCallback(
    (index: number) => {
      const html = threads[index].description;
      const el = document.createElement("div");
      el.innerHTML = html;
      return el.innerText;
    },
    [threads]
  );

  useEffect(() => {
    fetchThread(0);
  }, []);

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="p-3 flex gap-2 text-xl font-semibold items-center border-b">
        <ListOutlineIcon />
        Library
      </div>
      {threadListQuery.isLoading && <Loader />}
      <InfiniteScroll
        rowCount={threads.length}
        rowRenderer={(index) => {
          const thread = threads[index];
          return (
            <Link
              key={index}
              href={getFilledRoutes(AppRoutes.SEARCH_PAGE, { threadSlug: thread.slug })}
              className="p-3 border-b group cursor-pointer block"
            >
              <div className="text-base font-semibold mb-2 text-black group-hover:text-primary">{thread.query}</div>
              <p className="text-sm text-gray-600 line-clamp-2">{getInnerText(index)}</p>
              <div className="mt-2 flex items-center justify-between text-gray-500 text-xs">
                <span>{timeAgo(thread.created_at)}</span>
              </div>
            </Link>
          );
        }}
        hasMore={true}
        // hasMore={!!threadListQuery.data?.next}
        fetchMore={() => {
          console.log("fetch more", threads.length);
          fetchThread(threads.length);
        }}
        windowScroll
      >
        {threadListQuery.data?.next ? (
          <Loader rowCount={1} />
        ) : (
          <div className="p-3 text-center text-gray-500 text-sm">No more threads</div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default LibraryView;
