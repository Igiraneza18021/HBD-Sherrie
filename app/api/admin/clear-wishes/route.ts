import { NextResponse } from "next/server"
import { clearAllWishes } from "@/lib/database"

export async function DELETE() {
  try {
    await clearAllWishes()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to clear wishes:", error)
    return NextResponse.json({ error: "Failed to clear wishes" }, { status: 500 })
  }
}
