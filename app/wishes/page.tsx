import { Suspense } from "react"
import { getBirthdayPerson, getBirthdayWishes } from "@/lib/database"
import WishesPage from "@/components/wishes-page"

export default async function Wishes() {
  const [birthdayPerson, wishes] = await Promise.all([getBirthdayPerson(), getBirthdayWishes()])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WishesPage birthdayPerson={birthdayPerson} initialWishes={wishes} />
    </Suspense>
  )
}
