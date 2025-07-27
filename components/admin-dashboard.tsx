"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Settings, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [birthdayPerson, setBirthdayPerson] = useState("")
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "Ndacyariho@0") {
      setIsAuthenticated(true)
      loadData()
    } else {
      alert("Incorrect password")
    }
  }

  const loadData = async () => {
    setLoading(true)
    setError("")
    try {
      const [personResponse, wishesResponse] = await Promise.all([
        fetch("/api/admin/birthday-person"),
        fetch("/api/wishes"),
      ])

      const personData = await personResponse.json()
      const wishesData = await wishesResponse.json()

      setBirthdayPerson(personData.name)
      setWishes(wishesData)
    } catch (error) {
      console.error("Failed to load data:", error)
      setError("Failed to load data. Please check your database connection.")
    } finally {
      setLoading(false)
    }
  }

  const updateBirthdayPerson = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const response = await fetch("/api/admin/birthday-person", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: birthdayPerson }),
      })

      if (response.ok) {
        setSuccess("Birthday person updated successfully!")
      } else {
        throw new Error("Failed to update")
      }
    } catch (error) {
      console.error("Failed to update birthday person:", error)
      setError("Failed to update birthday person")
    } finally {
      setLoading(false)
    }
  }

  const clearAllWishes = async () => {
    if (!confirm("Are you sure you want to delete all birthday wishes? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const response = await fetch("/api/admin/clear-wishes", {
        method: "DELETE",
      })

      if (response.ok) {
        setWishes([])
        setSuccess("All wishes cleared successfully!")
      } else {
        throw new Error("Failed to clear wishes")
      }
    } catch (error) {
      console.error("Failed to clear wishes:", error)
      setError("Failed to clear wishes")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <Settings className="w-6 h-6" />
              <span>Admin Login</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-purple-100">Manage birthday celebrations</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{success}</span>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Birthday Person Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={updateBirthdayPerson} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Birthday Person Name</label>
                  <Input
                    value={birthdayPerson}
                    onChange={(e) => setBirthdayPerson(e.target.value)}
                    placeholder="Enter birthday person's name"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Updating..." : "Update Birthday Person"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Birthday Wishes ({wishes.length})</span>
                <Button
                  onClick={clearAllWishes}
                  variant="destructive"
                  size="sm"
                  disabled={loading || wishes.length === 0}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {wishes.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No wishes yet</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {wishes.map((wish: any) => (
                    <div key={wish.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{wish.sender_name}</span>
                        <span className="text-xs text-gray-500">{new Date(wish.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-700">{wish.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() => {
              setIsAuthenticated(false)
              setPassword("")
              setError("")
              setSuccess("")
            }}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            Logout
          </Button>
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
