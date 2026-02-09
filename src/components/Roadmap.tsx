"use client"

import { motion } from "framer-motion"

const phases = [
  {
    title: "MVP 단계",
    date: "4-6주",
    goal: "핵심 가치 검증 및 출시",
    items: ["이메일 & 소셜 로그인", "날짜별 Todo CRUD", "푸시 알림 리마인더", "프로필 관리"],
    color: "#fff9c4",
    rotate: -1
  },
  {
    title: "Growth 단계",
    date: "2-3개월",
    goal: "사용자 리텐션 및 소셜",
    items: ["친구 시스템 & 피드", "반복 Todo 기능", "알림 센터", "구독 수익화"],
    color: "#e3f2fd",
    rotate: 2
  },
  {
    title: "Scale 단계",
    date: "3개월+",
    goal: "안정성 및 확장",
    items: ["보안 강화 & 로깅", "고급 통계 분석", "고급 알림 유형", "관리자 대시보드"],
    color: "#f3e5f5",
    rotate: -2
  }
]

export function Roadmap() {
  return (
    <section className="px-6 py-24 sm:py-32 relative">
      {/* Sketched timeline line */}
      <div className="absolute top-1/2 left-0 w-full h-1 border-t-4 border-dashed border-foreground/10 -translate-y-1/2 hidden lg:block" />

      <div className="mx-auto max-w-6xl relative">
        <div className="mb-20 text-center">
          <div className="inline-block px-4 py-1 bg-secondary-accent text-white wobbly-md border-2 border-foreground hand-shadow-hover -rotate-2 font-bold mb-4">
            Our Journey
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">단계별 출시 전략</h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              style={{ rotate: phase.rotate + "deg" }}
              className="relative bg-white border-[3px] border-foreground p-8 hand-shadow-lg group"
            >
              {/* Tape effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-foreground opacity-10 rotate-1" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brand">{phase.title.split(' ')[0]}</span>
                  <span className="bg-muted px-3 py-1 wobbly-sm border-2 border-foreground text-sm font-bold rotate-3">
                    {phase.date}
                  </span>
                </div>

                <div className="pb-4 border-b-2 border-dashed border-muted">
                  <p className="text-xl font-bold leading-tight">{phase.goal}</p>
                </div>

                <ul className="space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-brand font-bold mt-1">✓</span>
                      <span className="text-lg font-medium opacity-80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase number scribble */}
              <div className="absolute -bottom-6 -right-4 text-7xl font-bold opacity-5 -rotate-12 pointer-events-none">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
