import { Loader2 } from "lucide-react"

export default function AnimatedLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 text-white">
      <Loader2 className="w-16 h-16 animate-spin text-yellow-300 mb-4" />
      <p className="text-xl font-semibold">Loading magic...</p>
    </div>
  )
}
