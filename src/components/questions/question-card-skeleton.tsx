import { Skeleton } from "@/components/ui/skeleton";

export function QuestionCardSkeleton() {
  return (
    <div className="question-card relative">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <Skeleton className="h-6 w-3/4" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center gap-2 flex-wrap">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="absolute bottom-4 right-4">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
