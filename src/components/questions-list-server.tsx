import { getQuestions } from "@/lib/dal";
import { QuestionCard } from "@/components/question-card";

export async function QuestionsListServer() {
  const questionsData = await getQuestions();

  if (questionsData.questions.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No questions found</p>
      </div>
    );
  }

  return (
    <>
      {questionsData.questions.map((question, index) => (
        <QuestionCard key={question.id} question={question} index={index} />
      ))}
    </>
  );
}
