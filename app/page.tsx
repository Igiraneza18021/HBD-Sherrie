import { Suspense } from "react"
import { getBirthdayPerson } from "@/lib/database"
import LandingPage from "@/components/landing-page"

export default async function Home() {
  const birthdayPerson = await getBirthdayPerson()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingPage birthdayPerson={birthdayPerson} />
    </Suspense>
  )
}
