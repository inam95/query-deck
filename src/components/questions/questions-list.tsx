import { getQuestions } from "@/lib/dal";
import { QuestionCard } from "../question-card";

export async function QuestionsList() {
  const questionsData = await getQuestions();
  return (
    <div className="space-y-4 mb-8">
      {questionsData.questions.length > 0 ? (
        questionsData.questions.map((question, index) => (
          <QuestionCard key={question.id} question={question} index={index} />
        ))
      ) : (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No questions found</p>
        </div>
      )}
    </div>
  );
}
