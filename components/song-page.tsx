"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

interface SongPageProps {
  birthdayPerson: string
}

export default function SongPage({ birthdayPerson }: SongPageProps) {
  const tiktokVideoId = "ZMScF5jk8" // Extracted from vm.tiktok.com/ZMScF5jk8/
  const embedUrl = `https://www.tiktok.com/embed/v2/${tiktokVideoId}?autoplay=1&loop=1&mute=0`

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 p-6 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/celebrate">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Happy Birthday {birthdayPerson}!</h1>
          <div className="flex items-center justify-center space-x-2 text-yellow-300">
            <Sparkles className="w-5 h-5" />
            <p className="text-lg">A special birthday song just for you</p>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="mb-8">
          <Card className="bg-black/30 rounded-lg p-2 mb-6 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full" style={{ paddingTop: "177.7778%" /* 9:16 aspect ratio */ }}>
                <iframe
                  src={embedUrl}
                  allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="TikTok Video"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  style={{ border: "none" }}
                ></iframe>
              </div>
              <p className="text-center text-purple-100 text-sm mt-4">🎵 Happy Birthday Remix 🎵</p>
              <p className="text-center text-purple-100 text-xs mt-1">By Abaila dane</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <h2 className="text-xl font-semibold">Birthday Message</h2>
            </div>
            <p className="text-purple-100 mb-4">
              {birthdayPerson}, this song is a small token of how much you mean to us. Your friendship brings so much
              joy and laughter to our life.
            </p>
            <p className="text-purple-100">
              We hope this birthday is just the beginning of an amazing year ahead filled with wonderful adventures and
              beautiful moments!
            </p>
          </CardContent>
        </Card>
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
