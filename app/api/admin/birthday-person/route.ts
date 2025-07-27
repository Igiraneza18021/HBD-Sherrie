import { type NextRequest, NextResponse } from "next/server"
import { getBirthdayPerson, updateBirthdayPerson } from "@/lib/database"

export async function GET() {
  try {
    const name = await getBirthdayPerson()
    return NextResponse.json({ name })
  } catch (error) {
    console.error("Failed to get birthday person:", error)
    return NextResponse.json({ error: "Failed to get birthday person" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    await updateBirthdayPerson(name)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update birthday person:", error)
    return NextResponse.json({ error: "Failed to update birthday person" }, { status: 500 })
  }
}
