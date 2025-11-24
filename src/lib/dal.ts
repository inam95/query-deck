import prisma from "../app/lib/prisma";
import type { Question } from "../app/generated/prisma/client";
import type { Prisma } from "../app/generated/prisma/client";

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  types?: string[];
  difficulties?: number[];
  sortBy?: "difficulty" | "title" | "votes";
  sortOrder?: "asc" | "desc";
  search?: string;
}

export interface GetQuestionsResult {
  questions: Question[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getQuestions(
  params: GetQuestionsParams = {}
): Promise<GetQuestionsResult> {
  const {
    page = 1,
    pageSize = 10,
    types,
    difficulties,
    sortBy = "votes",
    sortOrder = "desc",
    search,
  } = params;

  const validPage = Math.max(1, page);
  const validPageSize = Math.max(1, Math.min(100, pageSize)); // Cap at 100 items per page
  const skip = (validPage - 1) * validPageSize;

  const where: Prisma.QuestionWhereInput = {};

  if (types && types.length > 0) {
    where.type = { in: types };
  }

  if (difficulties && difficulties.length > 0) {
    const validDifficulties = difficulties.filter((d) => d >= 1 && d <= 3);
    if (validDifficulties.length > 0) {
      where.difficulty = { in: validDifficulties };
    }
  }

  if (search && search.trim().length > 0) {
    where.OR = [
      {
        title: {
          contains: search.trim(),
          mode: "insensitive",
        },
      },
      {
        questionSummary: {
          contains: search.trim(),
          mode: "insensitive",
        },
      },
    ];
  }

  const orderBy: Prisma.QuestionOrderByWithRelationInput = {};
  orderBy[sortBy] = sortOrder;

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      orderBy,
      skip,
      take: validPageSize,
    }),
    prisma.question.count({ where }),
  ]);

  const totalPages = Math.ceil(total / validPageSize);

  return {
    questions,
    total,
    page: validPage,
    pageSize: validPageSize,
    totalPages,
  };
}

export async function getUniqueTypes(): Promise<string[]> {
  const questions = await prisma.question.findMany({
    select: {
      type: true,
    },
    distinct: ["type"],
  });

  return questions.map((q) => q.type).sort();
}

export function getDifficulties(): number[] {
  return [1, 2, 3];
}
