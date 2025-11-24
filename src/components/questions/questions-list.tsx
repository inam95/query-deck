import { getQuestions } from "@/lib/dal";
import { ParsedSearchParams } from "@/lib/search-params";
import { QuestionCard } from "./question-card";
import { QuestionsPagination } from "./questions-pagination";

interface QuestionsListProps {
  searchParams: ParsedSearchParams;
}

export async function QuestionsList({ searchParams }: QuestionsListProps) {
  const questionsResult = await getQuestions({
    types: searchParams.types.length > 0 ? searchParams.types : undefined,
    difficulties:
      searchParams.difficulties.length > 0
        ? searchParams.difficulties
        : undefined,
    sortBy: searchParams.sort,
    sortOrder: searchParams.order,
    page: searchParams.page,
    search: searchParams.q || undefined,
  });
  return (
    <div className="space-y-4 mb-8">
      {questionsResult.questions.length > 0 ? (
        questionsResult.questions.map((question, index) => (
          <QuestionCard key={question.id} question={question} index={index} />
        ))
      ) : (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No questions found</p>
        </div>
      )}
      <QuestionsPagination questionsResult={questionsResult} />
    </div>
  );
}
