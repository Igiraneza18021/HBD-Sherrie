import { Suspense } from "react"
import { getBirthdayPerson } from "@/lib/database"
import SongPage from "@/components/song-page"

export default async function Song() {
  const birthdayPerson = await getBirthdayPerson()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SongPage birthdayPerson={birthdayPerson} />
    </Suspense>
  )
}
