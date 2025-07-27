import { Suspense } from "react"
import { getBirthdayPerson, getQuizQuestions } from "@/lib/database"
import QuizPage from "@/components/quiz-page"

export default async function Quiz() {
  const [birthdayPerson, questions] = await Promise.all([getBirthdayPerson(), getQuizQuestions()])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizPage birthdayPerson={birthdayPerson} questions={questions} />
    </Suspense>
  )
}
