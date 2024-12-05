import BoxLoader from "@/components/boxLoader";
import { AppRoutes } from "@/enum";
import { rejoyAiApi } from "@/services/rejoy-ai.service";
import { getFilledRoutes } from "@/utils";
import Link from "next/link";

const Loader = () => {
  return (
    <>
      <BoxLoader height={8} />
      <BoxLoader height={8} />
      <BoxLoader height={8} />
      <BoxLoader height={8} />
    </>
  );
};

const Library = () => {
  const { data: threadsResponse, isLoading } = rejoyAiApi.useQuickThreadListQuery();
  return (
    <div>
      <div className="flex gap-3 justify-stretch p-1">
        <div className="w-[20px]">
          <div className="h-full bg-slate-200 mx-auto w-[2px]"></div>
        </div>
        <div className="flex-1 flex gap-2 flex-col">
          {isLoading && <Loader />}
          {threadsResponse?.results?.map((thread) => {
            return (
              <Link
                key={thread.id}
                href={getFilledRoutes(AppRoutes.SEARCH_PAGE, {
                  threadSlug: thread.slug,
                })}
                className="text-xs cursor-pointer hover:text-primary"
              >
                {thread.query}
              </Link>
            );
          })}
          {!!threadsResponse?.next && (
            <Link
              href={AppRoutes.LIBRARY}
              className="text-xs text-primary cursor-pointer hover:text-primary"
            >
              View all
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
