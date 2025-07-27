import { Suspense } from "react"
import { getBirthdayPerson, getQuizQuestions } from "@/lib/database"
import QuizPage from "@/components/quiz-page"
import AnimatedLoading from "@/components/animated-loading"

export default async function Quiz() {
  const [birthdayPerson, questions] = await Promise.all([getBirthdayPerson(), getQuizQuestions()])

  return (
    <Suspense fallback={<AnimatedLoading />}>
      <QuizPage birthdayPerson={birthdayPerson} questions={questions} />
    </Suspense>
  )
}
