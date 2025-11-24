"use client";

import { useState } from "react";
import { Search, ChevronsUpDown } from "lucide-react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { QuestionCard } from "@/components/question-card";
import type { GetQuestionsResult } from "@/lib/dal";

interface QuestionsLayoutProps {
  initialData: GetQuestionsResult;
}

export function QuestionsLayout({ initialData }: QuestionsLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-[calc(100vh-4rem)] px-4 md:px-6 py-6">
      {/* Search Bar Area */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Search className="h-4 w-4" />
            </div>
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button variant="outline" size="sm" className="gap-2 h-9">
            Votes
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Questions List Area */}
      <div className="space-y-4 mb-8">
        {initialData.questions.length > 0 ? (
          initialData.questions.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border border-border bg-card p-12 text-center"
          >
            <p className="text-muted-foreground">No questions found</p>
          </motion.div>
        )}
      </div>

      {/* Pagination Area */}
      {initialData.totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center justify-center pt-4 border-t border-border"
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="/"
                  className={
                    initialData.page === 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
              {Array.from(
                { length: Math.min(initialData.totalPages, 5) },
                (_, i) => {
                  let pageNum;
                  if (initialData.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (initialData.page <= 3) {
                    pageNum = i + 1;
                  } else if (initialData.page >= initialData.totalPages - 2) {
                    pageNum = initialData.totalPages - 4 + i;
                  } else {
                    pageNum = initialData.page - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="/"
                        isActive={pageNum === initialData.page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}
              {initialData.totalPages > 5 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="/">
                      {initialData.totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  href="/"
                  className={
                    initialData.page === initialData.totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      )}
    </main>
  );
}
