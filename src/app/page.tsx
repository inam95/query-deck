import prisma from "./lib/prisma";

export default async function Home() {
  const questions = await prisma.question.findMany();
  console.log(questions);
  return <div>Query Deck</div>;
}
