"use client"

import { useEffect, useRef } from "react"

// Basic CSS for fireworks effect
const fireworksCss = `
.fireworks-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 10;
}

.firework {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  animation: firework-burst 1s ease-out forwards;
}

@keyframes firework-burst {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.firework::before, .firework::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
}

.firework::before {
  transform: rotate(45deg);
}

.firework::after {
  transform: rotate(90deg);
}
`

export default function Fireworks() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = fireworksCss
    document.head.appendChild(styleSheet)

    const createFirework = () => {
      if (!containerRef.current) return

      const firework = document.createElement("div")
      firework.className = "firework"
      firework.style.left = `${Math.random() * 100}%`
      firework.style.top = `${Math.random() * 100}%`
      firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`
      firework.style.animationDelay = `${Math.random() * 0.5}s` // Stagger animation

      containerRef.current.appendChild(firework)

      // Remove firework after animation
      firework.addEventListener("animationend", () => {
        firework.remove()
      })
    }

    const interval = setInterval(createFirework, 500) // Create a firework every 0.5 seconds

    return () => {
      clearInterval(interval)
      document.head.removeChild(styleSheet)
    }
  }, [])

  return <div ref={containerRef} className="fireworks-container" aria-hidden="true" />
}
