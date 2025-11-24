import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { GetQuestionsResult } from "@/lib/dal";

export function QuestionsPagination({
  questionsResult,
}: {
  questionsResult: GetQuestionsResult;
}) {
  return (
    questionsResult.totalPages > 1 && (
      <div className="flex items-center justify-center pt-4 border-t border-border">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="/"
                className={
                  questionsResult.page === 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
            {Array.from(
              { length: Math.min(questionsResult.totalPages, 5) },
              (_, i) => {
                let pageNum;
                if (questionsResult.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (questionsResult.page <= 3) {
                  pageNum = i + 1;
                } else if (
                  questionsResult.page >=
                  questionsResult.totalPages - 2
                ) {
                  pageNum = questionsResult.totalPages - 4 + i;
                } else {
                  pageNum = questionsResult.page - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="/"
                      isActive={pageNum === questionsResult.page}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            )}
            {questionsResult.totalPages > 5 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="/">
                    {questionsResult.totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href="/"
                className={
                  questionsResult.page === questionsResult.totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  );
}
