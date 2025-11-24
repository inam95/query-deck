import { Suspense } from "react";
import { FacetFilter } from "../filter/facet-filter";
import { QuestionCardSkeleton } from "./question-card-skeleton";
import { ParsedSearchParams } from "@/lib/search-params";
import { QuestionsList } from "./questions-list";

interface QuestionsLayoutProps {
  searchParams: ParsedSearchParams;
}

export function QuestionsLayout({ searchParams }: QuestionsLayoutProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] px-4 md:px-6 py-6">
      {/* Search Bar Area */}
      <FacetFilter />

      {/* Questions List Area */}
      <Suspense
        fallback={
          <div className="space-y-4 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <QuestionCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <QuestionsList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
