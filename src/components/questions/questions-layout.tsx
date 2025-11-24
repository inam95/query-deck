import { Search, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { QuestionsList } from "./questions-list";
import { Suspense } from "react";
import { QuestionCardSkeleton } from "./question-card-skeleton";

export function QuestionsLayout() {
  return (
    <main className="min-h-[calc(100vh-4rem)] px-4 md:px-6 py-6">
      {/* Search Bar Area */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Search className="h-4 w-4" />
            </div>
            <Input type="text" placeholder="Search" className="pl-10" />
          </div>

          <Button variant="outline" size="sm" className="gap-2 h-9">
            Votes
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

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
        <QuestionsList />
      </Suspense>

      {/* Pagination Area */}
    </main>
  );
}
