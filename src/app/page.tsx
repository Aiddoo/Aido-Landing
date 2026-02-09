import { AppPreview } from "@/components/AppPreview"
import { CTA } from "@/components/CTA"
import { Friends } from "@/components/Friends"
import { Hero } from "@/components/Hero"
import { Roadmap } from "@/components/Roadmap"
import { Values } from "@/components/Values"
import { Vision } from "@/components/Vision"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent selection:bg-brand/20 selection:text-brand relative">
      <div className="paper-grain" />

      {/* Navigation - Hand-Drawn Minimal */}
      <nav className="fixed top-6 z-50 w-full px-6 pointer-events-none">
        <div className="mx-auto flex max-w-6xl items-center justify-between bg-white/80 backdrop-blur wobbly-md border-[3px] border-foreground px-8 py-4 hand-shadow-lg pointer-events-auto">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10 wobbly-md border-2 border-foreground bg-brand group transition-transform hover:-rotate-12">
               <Image
                src="/logo.png"
                alt="Aido"
                fill
                priority
                className="object-contain p-1.5"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight">Aido</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="hidden text-lg font-bold text-foreground/60 sm:block hover:text-brand cursor-pointer transition-colors">고양이 친구들</span>
            <div className="h-8 w-px border-l-2 border-dashed border-foreground/30" />
            <button type="button" className="text-lg font-bold text-brand hover:scale-110 active:scale-95 transition-all">
              출시 알람 받기
            </button>
          </div>
        </div>
      </nav>

      <Hero />
      <Friends />
      <Vision />
      <Values />
      <Roadmap />
      <AppPreview />
      <CTA />

      <footer className="px-6 py-20 relative">
        {/* Footer separator line */}
        <div className="w-full h-1 border-t-2 border-dashed border-foreground opacity-20 mb-20" />

        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-12 sm:flex-row">
          <div className="flex items-center gap-4 group">
            <div className="relative h-8 w-8 wobbly-md border-2 border-foreground bg-foreground p-1 grayscale group-hover:grayscale-0 transition-all group-hover:bg-brand">
               <Image
                src="/logo.png"
                alt="Aido"
                fill
                className="object-contain p-1"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">Aido</span>
          </div>

          <div className="text-center sm:text-left space-y-2">
            <p className="text-lg font-bold opacity-80">
              © 2026 Aido Labs. All rights reserved.
            </p>
            <p className="text-sm font-medium opacity-50 underline decoration-wavy decoration-brand decoration-2 underline-offset-4">
              Thoughtfully made in Seoul.
            </p>
          </div>

          <div className="flex gap-10 text-xs font-bold uppercase tracking-[0.2em] relative">
            {/* Social links removed as requested */}
          </div>
        </div>
      </footer>
    </main>
  )
}
