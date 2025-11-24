"use client";

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
import { useQueryState } from "nuqs";
import { searchParamsParsers } from "@/lib/search-params";
import { useCallback } from "react";

export function QuestionsPagination({
  questionsResult,
}: {
  questionsResult: GetQuestionsResult;
}) {
  const [page, setPage] = useQueryState("page", {
    ...searchParamsParsers.page,
    shallow: false,
  });

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    [setPage]
  );

  const handlePrevious = useCallback(() => {
    if (questionsResult.page > 1) {
      handlePageChange(questionsResult.page - 1);
    }
  }, [questionsResult.page, handlePageChange]);

  const handleNext = useCallback(() => {
    if (questionsResult.page < questionsResult.totalPages) {
      handlePageChange(questionsResult.page + 1);
    }
  }, [questionsResult.page, questionsResult.totalPages, handlePageChange]);

  return (
    questionsResult.totalPages > 1 && (
      <div className="flex items-center justify-center pt-4 border-t border-border">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevious();
                }}
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
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNum);
                      }}
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
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(questionsResult.totalPages);
                    }}
                  >
                    {questionsResult.totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
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
