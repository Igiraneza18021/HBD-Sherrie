"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, Heart, Star, Loader2 } from "lucide-react"
import Link from "next/link"
import AddWishModal from "./add-wish-modal"

interface Wish {
  id: number
  sender_name: string
  message: string
  created_at: string
}

interface WishesPageProps {
  birthdayPerson: string
  initialWishes: Wish[]
}

export default function WishesPage({ birthdayPerson, initialWishes }: WishesPageProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchWishes = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/wishes")
        const newWishes = await response.json()
        setWishes(newWishes)
      } catch (error) {
        console.error("Failed to fetch wishes:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchWishes()
  }, [])

  const refreshWishes = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/wishes")
      const newWishes = await response.json()
      setWishes(newWishes)
      setCurrentIndex(0) // Reset to first wish after refresh
    } catch (error) {
      console.error("Failed to refresh wishes:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextWish = () => {
    setCurrentIndex((prev) => (prev + 1) % wishes.length)
  }

  const prevWish = () => {
    setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length)
  }

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

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Birthday Wishes for {birthdayPerson}</h1>
          <p className="text-purple-100">Swipe through special messages</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading birthday wishes...</span>
          </div>
        ) : wishes.length > 0 ? (
          <div className="mb-6">
            <Card className="bg-gradient-to-br from-pink-400 to-red-500 border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <span className="text-sm text-pink-100">
                    {currentIndex + 1} of {wishes.length}
                  </span>
                </div>
                <p className="text-white mb-4 leading-relaxed">{wishes[currentIndex]?.message}</p>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-pink-200" />
                  <span className="text-pink-100">From: {wishes[currentIndex]?.sender_name}</span>
                </div>
              </CardContent>
            </Card>

            {wishes.length > 1 && (
              <div className="flex justify-between mt-4">
                <Button onClick={prevWish} variant="ghost" className="text-white hover:bg-white/20">
                  Previous
                </Button>
                <div className="flex space-x-2 items-center">
                  {wishes.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/40"}`}
                    />
                  ))}
                </div>
                <Button onClick={nextWish} variant="ghost" className="text-white hover:bg-white/20">
                  Next
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-purple-200" />
            <p className="text-purple-100">No birthday wishes yet. Be the first to send one!</p>
          </div>
        )}

        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 mb-6"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Add Your Birthday Wish
        </Button>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Heart className="w-6 h-6 text-pink-300" />
              <h2 className="text-xl font-semibold">A Note for {birthdayPerson}</h2>
            </div>
            <p className="text-purple-100 mb-4">
              {birthdayPerson}, these wishes from your friends and loved ones show how special you are to everyone. Your
              friendship is a gift that keeps on giving.
            </p>
            <p className="text-purple-100">
              We hope this birthday brings you as much joy as you bring to everyone around you. {"Here's"} to
              celebrating you today and always!
            </p>
          </CardContent>
        </Card>
      </div>

      <AddWishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        birthdayPerson={birthdayPerson}
        onWishAdded={refreshWishes}
      />

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