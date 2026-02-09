"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const screens = [
  { title: "스플래시", path: "/app-assets/splash.png", rotate: -2 },
  { title: "메인 홈", path: "/app-assets/home.png", rotate: 1 },
  { title: "SNS 로그인", path: "/app-assets/login.png", rotate: -1 },
  { title: "이메일 로그인", path: "/app-assets/email-login.png", rotate: 2 },
]

export function AppPreview() {
  return (
    <section className="overflow-hidden bg-[#fafafa] px-6 py-20 sm:py-32 relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-7xl leading-tight">
              모든 순간이 <br />
              <span className="relative">
                우아하게 연결됩니다.
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" fill="none" aria-hidden="true" role="img">
                  <title>Underline highlight</title>
                  <path d="M0 4C30 1 70 1 100 4" stroke="#2d5da1" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg sm:text-2xl font-medium text-muted-foreground leading-relaxed">
              스플래시 화면부터 메인 홈까지, <br className="hidden sm:inline" />
              Aido는 당신의 생각을 흐름에 맞춰 정돈해주는 가장 뛰어난 Ai 비서입니다.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-16">
            {screens.map((screen, index) => (
              <motion.div
                key={screen.title}
                initial={{ opacity: 0, y: 40, rotate: screen.rotate }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                whileHover={{ y: -10, rotate: 0 }}
                className="group relative"
              >
                {/* Hand-drawn frame marks */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-foreground rounded-tl-lg" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-foreground rounded-br-lg" />

                <div className="relative aspect-9/19 w-full max-w-[280px] overflow-hidden rounded-[2.5rem] border-4 border-foreground bg-white hand-shadow-lg transition-all duration-300">
                  <Image
                    src={screen.path}
                    alt={screen.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-8 text-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-foreground bg-muted px-4 py-1 wobbly-md border-2 border-foreground -rotate-2 inline-block">
                    {screen.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
