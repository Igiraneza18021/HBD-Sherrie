import { Suspense } from "react"
import { getBirthdayPerson } from "@/lib/database"
import LandingPage from "@/components/landing-page"
import AnimatedLoading from "@/components/animated-loading"

export default async function Home() {
  const birthdayPerson = await getBirthdayPerson()

  return (
    <Suspense fallback={<AnimatedLoading />}>
      <LandingPage birthdayPerson={birthdayPerson} />
    </Suspense>
  )
}
