"use client"

import { motion } from "framer-motion"
import { Crown, Sparkles, Users } from "lucide-react"

const values = [
  {
    icon: Sparkles,
    title: "개인 생산성",
    description: "날짜별 할 일 관리와 반복 Todo로 완벽한 하루를 계획하세요.",
    rotate: -1,
  },
  {
    icon: Users,
    title: "소셜 동기부여",
    description: "친구와 할 일을 공유하고 주간 달성 배지로 함께 성장하세요.",
    rotate: 2,
  },
  {
    icon: Crown,
    title: "프리미엄 경험",
    description: "로컬 데이터에서 클라우드 동기화로 이어지는 매끄러운 경험.",
    rotate: -2,
  },
]

export function Values() {
  return (
    <section className="px-6 py-24 sm:py-32 bg-muted/20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center relative">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">Aido의 핵심 가치</h2>
          <div className="h-1.5 w-40 bg-brand mx-auto wobbly-md" />
        </div>
        <div className="grid gap-12 sm:grid-cols-3 lg:gap-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div
                className="flex h-24 w-24 shrink-0 items-center justify-center wobbly border-[3px] border-foreground bg-white hand-shadow transition-transform group-hover:rotate-12 mb-8"
                style={{ rotate: value.rotate + "deg" }}
              >
                <value.icon className="h-10 w-10 text-brand" strokeWidth={2.5} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">{value.title}</h3>
                <p className="text-xl text-muted-foreground leading-relaxed px-4">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
