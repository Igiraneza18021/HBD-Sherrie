"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

interface LandingPageProps {
  birthdayPerson: string
}

export default function LandingPage({ birthdayPerson }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="relative">
          <Sparkles className="w-20 h-20 mx-auto text-yellow-300 animate-pulse" />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-yellow-200 animate-bounce" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Hey {birthdayPerson}!</h1>
          <p className="text-xl text-purple-100">We made something special just for your birthday!</p>
        </div>

        <Link href="/celebrate">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {"Let's Celebrate!"}
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>

      <footer className="absolute bottom-4 text-center text-purple-200 text-sm">
        <p>Made with ❤️ by Igiraneza Patrick</p>
        <a
          href="https://instagram.com/igiraneza.patrick"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-200"
        >
          @igiraneza.patrick
        </a>
      </footer>
    </div>
  )
}
