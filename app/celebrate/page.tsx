import { Suspense } from "react"
import { getBirthdayPerson } from "@/lib/database"
import CelebratePage from "@/components/celebrate-page"
import AnimatedLoading from "@/components/animated-loading"

export default async function Celebrate() {
  const birthdayPerson = await getBirthdayPerson()

  return (
    <Suspense fallback={<AnimatedLoading />}>
      <CelebratePage birthdayPerson={birthdayPerson} />
    </Suspense>
  )
}
