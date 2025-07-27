"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Cake, Music, Gamepad2Icon as GameController2 } from "lucide-react"
import Link from "next/link"

interface CelebratePageProps {
  birthdayPerson: string
}

export default function CelebratePage({ birthdayPerson }: CelebratePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 p-6 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Happy Birthday {birthdayPerson}!</h1>
          <p className="text-purple-100">Today is all about celebrating you!</p>
        </div>

        <div className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Cake className="w-6 h-6 text-yellow-300" />
                <h2 className="text-xl font-semibold">Birthday Wishes</h2>
              </div>
              <p className="text-purple-100 mb-4">
                {birthdayPerson}, on your special day, we want to wish you all the happiness in the world! {"You're"} an
                amazing friend who brings so much joy to our life.
              </p>
              <p className="text-purple-100 mb-4">
                May your day be filled with laughter, love, and unforgettable moments. {"Here's"} to celebrating you and
                all the wonderful things you are!
              </p>
              <Link href="/wishes">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">View Birthday Messages</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Music className="w-6 h-6 text-pink-300" />
                <h2 className="text-xl font-semibold">Birthday Song</h2>
              </div>
              <p className="text-purple-100 mb-4">
                A special birthday song just for you! This song is a small token of how much you mean to us.
              </p>
              <Link href="/song">
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Play Birthday Song</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <GameController2 className="w-6 h-6 text-green-300" />
                <h2 className="text-xl font-semibold">Birthday Quiz</h2>
              </div>
              <p className="text-purple-100 mb-4">
                Test your birthday knowledge with our fun quiz! See how much you know about celebrations.
              </p>
              <Link href="/quiz">
                <Button className="w-full bg-green-600 hover:bg-green-700">Take Birthday Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="text-center text-purple-200 text-sm mt-12">
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
