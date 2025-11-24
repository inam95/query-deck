import { Button } from "@/components/ui/button";
import { getQuestions } from "@/lib/dal";

export default async function Home() {
  const questions = await getQuestions();
  console.log(questions);
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
