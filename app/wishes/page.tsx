import { Suspense } from "react"
import { getBirthdayPerson, getBirthdayWishes } from "@/lib/database"
import WishesPage from "@/components/wishes-page"
import AnimatedLoading from "@/components/animated-loading"

export default async function Wishes() {
  const [birthdayPerson, wishes] = await Promise.all([getBirthdayPerson(), getBirthdayWishes()])

  return (
    <Suspense fallback={<AnimatedLoading />}>
      <WishesPage birthdayPerson={birthdayPerson} initialWishes={wishes} />
    </Suspense>
  )
}
