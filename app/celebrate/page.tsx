import { Suspense } from "react"
import { getBirthdayPerson } from "@/lib/database"
import CelebratePage from "@/components/celebrate-page"

export default async function Celebrate() {
  const birthdayPerson = await getBirthdayPerson()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CelebratePage birthdayPerson={birthdayPerson} />
    </Suspense>
  )
}
