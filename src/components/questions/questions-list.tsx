import { getQuestions } from "@/lib/dal";
import { QuestionCard } from "./question-card";
import { QuestionsPagination } from "./questions-pagination";

export async function QuestionsList() {
  const questionsResult = await getQuestions();
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
