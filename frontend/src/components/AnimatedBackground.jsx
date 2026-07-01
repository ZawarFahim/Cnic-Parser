import React from 'react'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────
   AnimatedBackground — floating gradient blobs
   + subtle grid pattern overlay
───────────────────────────────────────────── */

const blobs = [
  { x: '10%', y: '15%', w: 600, h: 600, color: 'rgba(16,185,129,0.06)', delay: 0,   dur: 12 },
  { x: '70%', y: '5%',  w: 500, h: 500, color: 'rgba(59,130,246,0.07)',  delay: 2,   dur: 15 },
  { x: '55%', y: '55%', w: 700, h: 700, color: 'rgba(16,185,129,0.04)', delay: 4,   dur: 18 },
  { x: '5%',  y: '60%', w: 400, h: 400, color: 'rgba(99,102,241,0.05)', delay: 1,   dur: 14 },
  { x: '80%', y: '70%', w: 350, h: 350, color: 'rgba(59,130,246,0.05)', delay: 3,   dur: 16 },
]

export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 0% 0%, rgba(16,185,129,0.05) 0%, transparent 40%),
            radial-gradient(ellipse at 100% 0%, rgba(59,130,246,0.05) 0%, transparent 40%),
            #020617
          `,
        }}
      />

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Animated blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: blob.x,
            top:  blob.y,
            width:  blob.w,
            height: blob.h,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 40, -20, 30, 0],
            y: [0, -30, 40, -15, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: blob.dur,
            delay: blob.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Top gradient fade */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.2), rgba(59,130,246,0.2), transparent)' }}
      />
    </div>
  )
}
