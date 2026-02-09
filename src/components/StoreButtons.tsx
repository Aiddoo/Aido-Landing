
"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export function StoreButtons() {
  const [showBubble, setShowBubble] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowBubble(true)
    setTimeout(() => setShowBubble(false), 3000)
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 relative">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="bg-brand text-white font-bold px-6 py-3 wobbly-md border-[3px] border-foreground hand-shadow whitespace-nowrap relative">
              아직 출시 준비 중이에요! 조금만 기다려주세요 🐾
              {/* Bubble Tail */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand border-r-[3px] border-b-[3px] border-foreground rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* App Store Button - Hand Drawn Style */}
      <button
        type="button"
        onClick={handleClick}
        className="group inline-flex items-center gap-4 wobbly border-[3px] border-foreground bg-white px-8 py-4 text-foreground transition-all hand-shadow hover:bg-muted hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
      >
        <svg viewBox="0 0 384 512" width="28" height="28" className="fill-current rotate-[-4deg]" aria-hidden="true" role="img">
          <title>App Store Logo</title>
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
        </svg>
        <div className="flex flex-col items-start leading-none group-hover:rotate-1">
          <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">Download on the</span>
          <span className="text-2xl font-bold text-nowrap">App Store</span>
        </div>
      </button>

      {/* Play Store Button - Hand Drawn Style */}
      <button
        type="button"
        onClick={handleClick}
        className="group inline-flex items-center gap-4 wobbly border-[3px] border-foreground bg-white px-8 py-4 text-foreground transition-all hand-shadow hover:bg-muted hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
      >
        <svg viewBox="0 0 512 512" width="28" height="28" className="fill-current rotate-3" aria-hidden="true" role="img">
          <title>Google Play Store Logo</title>
          <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
        </svg>
        <div className="flex flex-col items-start leading-none group-hover:-rotate-1">
          <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">Get it on</span>
          <span className="text-2xl font-bold text-nowrap">Google Play</span>
        </div>
      </button>
    </div>
  )
}
