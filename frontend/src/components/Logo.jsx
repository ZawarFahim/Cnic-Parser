import React from 'react'
import { motion } from 'framer-motion'

const sizeMap = {
  xs:  { icon: 22, text: 'text-sm'   },
  sm:  { icon: 28, text: 'text-lg'   },
  md:  { icon: 38, text: 'text-2xl'  },
  lg:  { icon: 52, text: 'text-3xl'  },
  xl:  { icon: 72, text: 'text-5xl'  },
}

const floatVariant = {
  animate: {
    y: [0, -5, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function Logo({ size = 'md', variant = 'full', animate = true, className = '' }) {
  const { icon: iconSize, text: textSize } = sizeMap[size] || sizeMap.md

  const IconSVG = (
    <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="gFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#10b981" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="gScan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#10b981" stopOpacity="0" />
          <stop offset="50%"  stopColor="#10b981" stopOpacity="1" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Card background */}
      <rect x="7" y="11" width="26" height="18" rx="3" fill="url(#gFill)" />
      {/* Card border */}
      <rect x="7" y="11" width="26" height="18" rx="3" stroke="url(#gG)" strokeWidth="1.5" fill="none" filter="url(#glow)" />

      {/* Speed lines */}
      <line x1="1" y1="17" x2="6"  y2="17" stroke="url(#gG)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="3" y1="20" x2="6"  y2="20" stroke="url(#gG)" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="1" y1="23" x2="6"  y2="23" stroke="url(#gG)" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.35" />

      {/* Profile */}
      <circle cx="17" cy="18.5" r="2.5" fill="url(#gG)" />

      {/* Data lines */}
      <line x1="24" y1="17"   x2="31" y2="17"   stroke="url(#gG)" strokeWidth="1"   strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="24" y1="19.5" x2="30" y2="19.5" stroke="url(#gG)" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="24" y1="22"   x2="27" y2="22"   stroke="url(#gG)" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.25" />

      {/* Sparkle */}
      <path d="M32 12.5L32.6 14L34.2 14L32.9 15L33.4 16.6L32 15.7L30.6 16.6L31.1 15L29.8 14L31.4 14Z" fill="url(#gG)" filter="url(#glow)" />

      {/* Animated scan line */}
      <motion.rect
        x="7" y="14" width="26" height="1.2" rx="0.6"
        fill="url(#gScan)"
        animate={{ y: [14, 24, 14], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )

  if (variant === 'icon') {
    return (
      <motion.div className={`relative inline-flex ${className}`} variants={animate ? floatVariant : undefined} animate={animate ? 'animate' : undefined}>
        {IconSVG}
      </motion.div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <motion.div variants={animate ? floatVariant : undefined} animate={animate ? 'animate' : undefined}>
        {IconSVG}
      </motion.div>
      <div className={`${textSize} font-display font-bold tracking-tight leading-none`}>
        <span style={{ color: '#f1f1f1' }}>CNIC</span>
        <span className="gradient-text">.io</span>
      </div>
    </div>
  )
}
