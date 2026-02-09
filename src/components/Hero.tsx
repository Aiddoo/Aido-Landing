"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { StoreButtons } from "./StoreButtons"

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center">
      {/* Decorative scribbles */}
      <div className="absolute top-40 left-10 hidden md:block -rotate-12 opacity-20">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" role="img">
          <title>Decorative Scribble</title>
          <path d="M10,50 Q25,25 50,50 T90,50" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8 sm:mb-12"
      >
        <div className="relative h-24 w-24 sm:h-32 lg:h-40 lg:w-40 wobbly border-4 border-foreground bg-white p-3 sm:p-4 hand-shadow-lg rotate-2 mx-auto">
          <Image
            src="/logo.png"
            alt="Aido Logo"
            fill
            priority
            className="object-contain p-3 sm:p-4"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl z-10"
      >
        <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-7xl lg:text-9xl leading-[1.1]! mb-8">
          친구와 함께하는 <br />
          <span className="text-brand relative inline-block">
            Ai 할 일 관리
            <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" aria-hidden="true" role="img">
              <title>Brush stroke highlight</title>
              <path d="M2 10C50 2 150 2 198 10" stroke="#FF6843" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="mt-8 sm:mt-12 text-balance text-lg font-medium text-foreground sm:text-xl lg:text-3xl max-w-2xl mx-auto leading-relaxed">
          빠른 출시보다 중요한 것은 핵심적인 연결입니다. <br className="sm:hidden" />
          Aido의 고양이 친구들이 당신과 친구의 일상을 <br className="hidden sm:inline" />
          가장 설레는 방식으로 연결해줄 거예요.
        </p>

        <div className="mt-16 flex flex-col items-center justify-center gap-12 relative">
          {/* Sketched arrow */}
          <div className="absolute -left-28 top-0 hidden lg:block -rotate-12">
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" role="img">
              <title>Arrow pointing down</title>
              <path d="M10,10 Q40,5 70,50" />
              <path d="M60,45 L70,50 L75,35" />
            </svg>
            <span className="text-sm font-bold rotate-6 block mt-2">지금 다운로드!</span>
          </div>

          <StoreButtons />

          <div className="flex flex-col items-center gap-4">
            <div className="bg-muted px-4 py-1 wobbly-md border-2 border-foreground hand-shadow text-sm font-bold -rotate-2">
              Coming Soon / Spring 2026
            </div>
            <div className="h-12 w-px border-l-2 border-dashed border-foreground" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            아래로 내려보세요
          </span>
          <div className="h-10 w-px border-l-2 border-dashed border-foreground" />
        </div>
      </motion.div>
    </section>
  )
}
