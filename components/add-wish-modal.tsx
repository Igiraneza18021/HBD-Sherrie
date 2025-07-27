"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sparkles, Send } from "lucide-react"

interface AddWishModalProps {
  isOpen: boolean
  onClose: () => void
  birthdayPerson: string
  onWishAdded: () => void
}

export default function AddWishModal({ isOpen, onClose, birthdayPerson, onWishAdded }: AddWishModalProps) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_name: name.trim(),
          message: message.trim(),
        }),
      })

      if (response.ok) {
        setName("")
        setMessage("")
        onClose()
        onWishAdded()
      }
    } catch (error) {
      console.error("Failed to add wish:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-purple-500 to-pink-500 border-none text-white max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>Add Your Wish for {birthdayPerson}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/20 border-white/30 placeholder:text-purple-200 text-white"
              required
            />
          </div>

          <div>
            <Textarea
              placeholder="Write your birthday wish here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white/20 border-white/30 placeholder:text-purple-200 text-white min-h-[120px] resize-none"
              required
            />
          </div>

          <div className="flex space-x-3">
            <Button type="button" onClick={onClose} variant="ghost" className="flex-1 text-white hover:bg-white/20">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Wish
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
