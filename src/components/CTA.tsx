"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"

export function CTA() {
  return (
    <section className="px-6 py-32 sm:py-48 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03]">
        <svg width="600" height="600" viewBox="0 0 600 600" aria-hidden="true" role="img">
          <title>Decorative background circle</title>
          <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20,10" />
        </svg>
      </div>

      <div className="mx-auto max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12 bg-[#fff9c4] wobbly border-[3px] border-foreground p-12 hand-shadow-lg -rotate-1"
        >
          {/* Tape effect */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-foreground opacity-10 rotate-1" />

          <h2 className="text-balance text-5xl font-bold tracking-tight sm:text-7xl leading-tight!">
            가장 먼저 <br />
            경험해보세요.
          </h2>
          <p className="mx-auto max-w-lg text-2xl font-medium text-foreground leading-relaxed!">
            준비가 되는 대로 가장 설레는 소식을 보내드릴게요. <br />
            무분별한 광고는 보내지 않습니다.
          </p>

          <div className="mx-auto flex max-w-md flex-col gap-6 sm:flex-row items-stretch sm:items-center">
            <input
              type="email"
              placeholder="이메일 주소를 입력해주세요"
              className="h-16 w-full wobbly-sm border-[3px] border-foreground bg-white px-8 text-xl font-medium focus:outline-none focus:ring-4 focus:ring-brand/20 transition-all placeholder:text-muted-foreground"
            />
            <Button size="lg" className="h-16 shrink-0 wobbly border-[3px] px-10 text-2xl font-bold">
              Notify me
            </Button>
          </div>

          <p className="text-sm font-bold opacity-60">
            * 우리는 당신의 개인정보를 소중히 여깁니다.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
