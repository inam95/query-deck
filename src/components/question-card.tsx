"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { capitalizeType } from "@/lib/utils";
import type { Question } from "../app/generated/prisma/client";

interface QuestionCardProps {
  question: Question;
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="question-card"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground leading-tight">
            {question.title}
          </h3>
        </div>

        {question.questionSummary && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {question.questionSummary}
          </p>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="type">{capitalizeType(question.type)}</Badge>
          <Badge variant="difficulty">Level {question.difficulty}</Badge>
          {question.companyAsked && (
            <span className="text-xs text-muted-foreground">
              {question.companyAsked}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
