import { QuestionCard } from "@/components/question-card";
import { getQuestions } from "@/lib/dal";
import { motion } from "motion/react";

async function QuestionsListContent() {
  const questionsData = await getQuestions();

  if (questionsData.questions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg border border-border bg-card p-12 text-center"
      >
        <p className="text-muted-foreground">No questions found</p>
      </motion.div>
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

export function QuestionsList() {
  return (
    <div className="space-y-4 mb-8">
      <QuestionsListContent />
    </div>
  );
}
