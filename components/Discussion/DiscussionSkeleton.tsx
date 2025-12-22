import { Skeleton } from "@/components/ui/skeleton";

export function DiscussionSkeleton() {
  return (
    <div className="w-full bg-[#1a110d]/40 border border-[#3e2723] rounded-xl p-5 sm:p-6 shadow-lg flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-[#3e2723]/60" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24 bg-[#3e2723]/60 rounded" />
            <Skeleton className="h-4 w-16 bg-[#3e2723]/40 rounded-md" />
          </div>
          <Skeleton className="h-3 w-20 bg-[#3e2723]/30 rounded" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-7 w-3/4 sm:w-1/2 bg-[#3e2723]/60 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 bg-[#3e2723]/40 rounded-md border border-[#3e2723]/50" />
          <Skeleton className="h-5 w-16 bg-[#3e2723]/40 rounded-md border border-[#3e2723]/50" />
        </div>
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full bg-[#3e2723]/30 rounded" />
          <Skeleton className="h-4 w-[85%] bg-[#3e2723]/30 rounded" />
        </div>
      </div>
      <div className="flex items-center gap-6 pt-1 border-t border-[#3e2723]/30 mt-1">
        <div className="flex items-center gap-2 mt-3">
          <Skeleton className="h-5 w-5 bg-[#3e2723]/50 rounded" />
          <Skeleton className="h-4 w-8 bg-[#3e2723]/50 rounded" />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Skeleton className="h-5 w-5 bg-[#3e2723]/50 rounded" />
          <Skeleton className="h-4 w-8 bg-[#3e2723]/50 rounded" />
        </div>
      </div>
    </div>
  );
}
