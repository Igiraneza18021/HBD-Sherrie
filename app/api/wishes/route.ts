import { type NextRequest, NextResponse } from "next/server"
import { getBirthdayWishes, addBirthdayWish } from "@/lib/database"

export async function GET() {
  try {
    const wishes = await getBirthdayWishes()
    return NextResponse.json(wishes)
  } catch (error) {
    console.error("Failed to fetch wishes:", error)
    return NextResponse.json({ error: "Failed to fetch wishes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sender_name, message } = await request.json()

    if (!sender_name || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await addBirthdayWish(sender_name, message)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to add wish:", error)
    return NextResponse.json({ error: "Failed to add wish" }, { status: 500 })
  }
}
