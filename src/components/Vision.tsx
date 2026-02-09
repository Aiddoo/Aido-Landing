"use client"

import { motion } from "framer-motion"

export function Vision() {
  return (
    <section className="px-6 py-32 sm:py-48 relative overflow-hidden">
      {/* Scribble background */}
      <div className="absolute top-20 right-10 opacity-10">
        <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true" role="img">
           <title>Decorative Scribble Circle</title>
           <path d="M10,100 C50,20 150,20 190,100 S50,180 10,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8,8" />
        </svg>
      </div>

      <div className="mx-auto max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12 bg-white wobbly border-[3px] border-foreground p-6 sm:p-12 hand-shadow-lg rotate-1"
        >
          <div className="inline-block px-4 py-1 bg-secondary-accent text-white wobbly-md border-2 border-foreground hand-shadow transform -rotate-3 font-bold">
            우리의 비전
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-7xl leading-tight!">
            복잡함은 결코 <br /> 정답이 될 수 없습니다.
          </h2>
          <div className="grid gap-12 text-xl sm:text-2xl font-medium text-foreground sm:grid-cols-2 leading-relaxed!">
            <p className="text-balance relative">
              <span className="absolute -left-6 top-0 text-brand text-4xl">"</span>
              우리는 도구가 사용자의 사고를 방해해서는 안 된다고 믿습니다.
              오늘날의 앱들은 너무 많은 정보와 기능으로 우리의 집중력을 소모시키고 있습니다.
            </p>
            <p className="text-balance">
              우리는 본질만 남기고 모두 덜어냈습니다.
              가장 비어있으면서도 가장 가득 찬 공간을 제안합니다. 당신의 영감이 끊길 틈이 없도록요.
              <span className="text-brand text-4xl leading-none">"</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
