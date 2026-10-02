"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function MotionFigure({
  children,
  rotate,
  className,
}: {
  children: ReactNode;
  rotate: number;
  className: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.figure
      initial={false}
      whileHover={reduced ? undefined : { y: -5, rotate: 0 }}
      transition={{ duration: 0.2 }}
      style={{ rotate: `${rotate}deg` }}
      className={className}
    >
      {children}
    </motion.figure>
  );
}
