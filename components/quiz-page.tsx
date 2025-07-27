"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Gamepad2Icon as GameController2, Trophy, X, Check, Clock } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
}

interface QuizPageProps {
  birthdayPerson: string
  questions: Question[]
}

export default function QuizPage({ birthdayPerson, questions }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(15)

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setShowResult(true)

    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizCompleted(true)
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
    setAnswers([])
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return "Perfect! You're a birthday expert! 🎉"
    if (percentage >= 80) return "Excellent! You know your birthday facts! 🌟"
    if (percentage >= 60) return "Good job! You did well! 👏"
    if (percentage >= 40) return "Not bad! Keep learning! 📚"
    return "Keep trying! Practice makes perfect! 💪"
  }

  useEffect(() => {
    if (!showResult && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult && !quizCompleted) {
      // Auto-submit empty answer when time runs out
      handleAnswerSelect("")
    }
  }, [timeLeft, showResult, quizCompleted])

  useEffect(() => {
    setTimeLeft(15)
  }, [currentQuestion])

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 p-6 text-white">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-300" />
            <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-6">
              <p className="text-2xl font-bold mb-2">
                Your Score: {score}/{questions.length}
              </p>
              <p className="text-lg mb-4">{Math.round((score / questions.length) * 100)}%</p>
              <p className="text-purple-100">{getScoreMessage()}</p>
            </div>
            <div className="space-y-3">
              <Button onClick={resetQuiz} className="w-full bg-green-600 hover:bg-green-700">
                Try Again
              </Button>
              <Link href="/celebrate">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Back to Celebration</Button>
              </Link>
            </div>
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

  const question = questions[currentQuestion]
  const options = [
    { key: "A", text: question.option_a },
    { key: "B", text: question.option_b },
    { key: "C", text: question.option_c },
    { key: "D", text: question.option_d },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 p-6 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/celebrate">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex justify-between items-center mb-6 text-yellow-300">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>
                {score}/{currentQuestion + (showResult ? 1 : 0)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{timeLeft}s</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <GameController2 className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
          <h1 className="text-2xl font-bold mb-2">Birthday Quiz for {birthdayPerson}</h1>
          <p className="text-purple-100">Test your birthday knowledge!</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-6">{question.question}</h2>
            <div className="space-y-3">
              {options.map((option) => {
                let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 "

                if (showResult) {
                  if (option.key === question.correct_answer) {
                    buttonClass += "bg-green-500 border-green-400 text-white"
                  } else if (option.key === selectedAnswer && option.key !== question.correct_answer) {
                    buttonClass += "bg-red-500 border-red-400 text-white"
                  } else {
                    buttonClass += "bg-white/10 border-white/20 text-purple-100"
                  }
                } else {
                  buttonClass += "bg-white/10 border-white/20 hover:bg-white/20 text-white"
                }

                return (
                  <button
                    key={option.key}
                    onClick={() => !showResult && handleAnswerSelect(option.key)}
                    className={buttonClass}
                    disabled={showResult}
                  >
                    <div className="flex items-center justify-between">
                      <span>
                        {option.key}. {option.text}
                      </span>
                      {showResult && option.key === question.correct_answer && <Check className="w-5 h-5 text-white" />}
                      {showResult && option.key === selectedAnswer && option.key !== question.correct_answer && (
                        <X className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-purple-200 mb-4 text-sm">
          Question {currentQuestion + 1} of {questions.length}
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
