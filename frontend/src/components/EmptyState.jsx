import React from 'react'
import { motion } from 'framer-motion'
import { ScanLine, Sparkles } from 'lucide-react'

export default function EmptyState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px 20px', gap: '12px' }}>
      <motion.div
        style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
        animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ScanLine size={22} style={{ color: '#10b981' }} />
        <motion.div style={{ position: 'absolute', top: '-5px', right: '-5px' }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          <Sparkles size={11} style={{ color: '#34d399' }} />
        </motion.div>
      </motion.div>

      <div>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#888' }}>
          No results yet
        </h3>
        <p style={{ fontSize: '0.7rem', color: '#444', marginTop: '5px', lineHeight: 1.6, maxWidth: '190px' }}>
          Upload a CNIC and hit <span style={{ color: '#10b981', fontWeight: 600 }}>Parse CNIC</span> to extract data
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', maxWidth: '210px' }}>
        {['📷  JPG, PNG, WebP supported','⚡  Results in under 2 seconds','🔒  Your data stays private'].map(h => (
          <div key={h} style={{ fontSize: '0.67rem', padding: '6px 10px', borderRadius: '7px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#444', textAlign: 'left' }}>{h}</div>
        ))}
      </div>
    </div>
  )
}
