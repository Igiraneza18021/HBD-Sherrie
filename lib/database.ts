import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function getBirthdayPerson(): Promise<string> {
  try {
    const result = await sql`
      SELECT birthday_person_name FROM birthday_settings 
      ORDER BY id DESC LIMIT 1
    `
    return result[0]?.birthday_person_name || "Sherrie Silver"
  } catch (error) {
    console.error("Failed to get birthday person:", error)
    return "Sherrie Silver"
  }
}

export async function updateBirthdayPerson(name: string): Promise<void> {
  await sql`
    UPDATE birthday_settings 
    SET birthday_person_name = ${name}, updated_at = CURRENT_TIMESTAMP
    WHERE id = (SELECT id FROM birthday_settings ORDER BY id DESC LIMIT 1)
  `
}

export async function getBirthdayWishes() {
  try {
    const result = await sql`
      SELECT * FROM birthday_wishes 
      ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error("Failed to get birthday wishes:", error)
    return []
  }
}

export async function addBirthdayWish(senderName: string, message: string) {
  await sql`
    INSERT INTO birthday_wishes (sender_name, message)
    VALUES (${senderName}, ${message})
  `
}

export async function clearAllWishes(): Promise<void> {
  await sql`DELETE FROM birthday_wishes`
}

export async function getQuizQuestions() {
  try {
    const result = await sql`
      SELECT * FROM quiz_questions 
      ORDER BY id
    `
    return result
  } catch (error) {
    console.error("Failed to get quiz questions:", error)
    return []
  }
}
