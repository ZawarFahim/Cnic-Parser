import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles, Zap, Shield } from 'lucide-react'
import Logo from './Logo'

/* ─────────────────────────────────────────────
   Hero — animated landing section
───────────────────────────────────────────── */

/* Animated CNIC illustration (SVG) */
function CnicIllustration() {
  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      style={{ perspective: '800px' }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Glow beneath card */}
      <motion.div
        className="absolute -bottom-6 inset-x-8 h-12 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.35) 0%, transparent 70%)',
          filter: 'blur(16px)',
        }}
        animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.8, 1.1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Card */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.95) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(16,185,129,0.1)',
          aspectRatio: '1.586 / 1',
          rotateX: '5deg',
        }}
        whileHover={{ rotateY: 4, rotateX: 2, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Card gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, transparent 50%, rgba(59,130,246,0.08) 100%)',
          }}
        />

        {/* Header strip */}
        <div
          className="absolute top-0 inset-x-0 h-8 flex items-center justify-between px-4"
          style={{ background: 'linear-gradient(90deg, rgba(16,185,129,0.25), rgba(59,130,246,0.25))' }}
        >
          <span className="text-[9px] font-semibold tracking-[0.2em] text-emerald-300 uppercase">
            Islamic Republic of Pakistan
          </span>
          <span className="text-[9px] font-semibold tracking-wider text-blue-300">CNIC</span>
        </div>

        {/* Card body */}
        <div className="absolute inset-0 top-8 px-5 py-3 flex gap-4">
          {/* Photo placeholder */}
          <div
            className="w-16 h-20 rounded-lg flex-shrink-0 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="rgba(16,185,129,0.5)" />
              <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* Fields */}
          <div className="flex-1 flex flex-col justify-center gap-2">
            {[
              { label: 'Name', val: 'Muhammad Ali Khan', w: 'w-full' },
              { label: 'Father', val: 'Khan Bahadur',    w: 'w-4/5' },
              { label: 'CNIC No.', val: '35202-1234567-8', w: 'w-full', mono: true },
              { label: 'DOB', val: '01-01-1990',         w: 'w-3/5' },
            ].map(f => (
              <div key={f.label}>
                <div className="text-[7px] text-slate-500 uppercase tracking-widest mb-0.5">{f.label}</div>
                <div className={`h-2 rounded-sm ${f.w}`}
                  style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div
                    className="h-full rounded-sm text-[8px] text-slate-300 px-1 flex items-center"
                    style={{ background: 'rgba(255,255,255,0.04)', fontFamily: f.mono ? 'monospace' : 'inherit' }}
                  >
                    <span style={{ fontSize: '6px', lineHeight: 1, color: 'rgba(255,255,255,0.6)' }}>
                      {f.val}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scan line animation */}
        <motion.div
          className="absolute inset-x-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.8), rgba(59,130,246,0.8), transparent)',
            boxShadow: '0 0 8px rgba(16,185,129,0.6)',
          }}
          animate={{ top: ['15%', '85%', '15%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Hologram shimmer */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        />
      </motion.div>

      {/* Floating data badges */}
      {[
        { label: 'AI Extraction', icon: '🤖', x: '-18%', y: '20%', delay: 0 },
        { label: '99.8% Accurate', icon: '✓',  x: '92%',  y: '60%', delay: 0.5 },
        { label: '< 2 seconds',   icon: '⚡',  x: '-12%', y: '75%', delay: 1 },
      ].map(badge => (
        <motion.div
          key={badge.label}
          className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            left: badge.x,
            top: badge.y,
            background: 'rgba(15,23,42,0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            color: '#94a3b8',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { delay: badge.delay + 0.8, duration: 0.4 },
            scale:   { delay: badge.delay + 0.8, duration: 0.4 },
            y: { delay: badge.delay + 1.2, duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span>{badge.icon}</span>
          <span style={{ color: '#e2e8f0' }}>{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

/* Feature pills */
const PILLS = [
  { icon: <Zap size={12} />,     label: 'Instant Results' },
  { icon: <Shield size={12} />,  label: 'Privacy First' },
  { icon: <Sparkles size={12} />,label: 'AI Powered' },
]

export default function Hero({ onUploadClick }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col gap-7">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="badge badge-brand text-xs">
                <Sparkles size={11} />
                Powered by Advanced AI
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <h1
                className="font-display font-bold leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
              >
                <span className="gradient-text-subtle">Drop the ID.</span>
                <br />
                <span className="gradient-text">We'll do</span>
                <span className="text-white"> the rest.</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-slate-400 text-lg leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              AI-powered CNIC parsing that transforms identity documents into
              clean, structured information within seconds. No manual entry.
              No mistakes.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              {PILLS.map(p => (
                <div
                  key={p.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-400"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span className="text-emerald-400">{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3 pt-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <motion.button
                className="btn btn-primary text-base px-7 py-3"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onUploadClick}
              >
                Upload CNIC
                <ArrowRight size={16} />
              </motion.button>

              <motion.a
                href="#how-it-works"
                className="btn btn-secondary text-base px-7 py-3"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
                <ChevronDown size={16} />
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex gap-8 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[
                { value: '99.8%', label: 'Accuracy' },
                { value: '< 2s',  label: 'Parse Time' },
                { value: '8',     label: 'Fields Extracted' },
              ].map(s => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-display font-bold gradient-text">{s.value}</span>
                  <span className="text-xs text-slate-500">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Illustration ── */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <CnicIllustration />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} className="text-slate-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
