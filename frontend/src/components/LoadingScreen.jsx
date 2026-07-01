import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const STATUS_MESSAGES = [
  'Initializing AI...', 'Preparing Document Parser...',
  'Reading CNIC...', 'Extracting Information...',
  'Generating Structured Output...', 'Almost Ready...',
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [exiting,  setExiting]  = useState(false)

  useEffect(() => {
    const duration = 2400, interval = 40
    const increment = 100 / (duration / interval)
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + increment, 100)
        if (next >= 100) { clearInterval(timer); setTimeout(() => setExiting(true), 150); setTimeout(() => onComplete?.(), 550) }
        return next
      })
    }, interval)
    return () => clearInterval(timer)
  }, [onComplete])

  useEffect(() => {
    setMsgIndex(Math.min(Math.floor((STATUS_MESSAGES.length * progress) / 100), STATUS_MESSAGES.length - 1))
  }, [progress])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0d0d0d' }}
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
        >
          {/* Radial green glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.07) 0%, transparent 60%)',
          }} />

          {/* Grid dots */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />

          <motion.div
            className="flex flex-col items-center gap-7"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            <Logo size="xl" variant="icon" animate />

            <div className="text-center">
              <h1 className="font-display font-bold tracking-tight mb-2" style={{ fontSize: '2.5rem', color: '#f1f1f1' }}>
                CNIC<span className="gradient-text">.io</span>
              </h1>
              <p style={{ fontSize: '0.85rem', color: '#555555', letterSpacing: '0.02em' }}>
                Drop the ID. We'll do the rest.
              </p>
            </div>

            {/* Spinner */}
            <div className="relative w-9 h-9">
              <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="14" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
                <motion.circle cx="18" cy="18" r="14" stroke="url(#lsg)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="26 62"
                  animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '18px 18px' }} />
                <defs>
                  <linearGradient id="lsg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Status */}
            <div className="h-4 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p key={msgIndex} style={{ fontSize: '0.72rem', color: '#555555', fontFamily: "'JetBrains Mono', monospace" }}
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
                  {STATUS_MESSAGES[msgIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div style={{ width: '200px' }}>
              <div className="flex justify-between mb-1.5" style={{ fontSize: '0.65rem', color: '#444' }}>
                <span>Loading</span><span style={{ color: '#10b981' }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: '2px', borderRadius: '999px', overflow: 'hidden', background: '#222' }}>
                <motion.div style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg,#10b981,#34d399)', width: `${progress}%`, boxShadow: '0 0 8px rgba(16,185,129,0.5)' }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
