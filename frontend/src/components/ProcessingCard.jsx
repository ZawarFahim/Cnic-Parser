import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Cpu, ScanLine, FileSearch, Sparkles } from 'lucide-react'

const STAGES = [
  { icon: <Brain size={13} />,      label: 'Activating Neural Network…', dur: 600 },
  { icon: <ScanLine size={13} />,   label: 'Scanning Document…',         dur: 900 },
  { icon: <FileSearch size={13} />, label: 'Detecting Text Regions…',    dur: 700 },
  { icon: <Cpu size={13} />,        label: 'Running OCR Engine…',        dur: 800 },
  { icon: <Sparkles size={13} />,   label: 'Structuring Output…',        dur: 600 },
]

export default function ProcessingCard({ previewUrl }) {
  const [stage,    setStage]    = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let elapsed = 0
    const total = STAGES.reduce((s, st) => s + st.dur, 0)
    const tick = setInterval(() => {
      elapsed += 50
      setProgress(Math.min((elapsed / total) * 100, 99))
      let acc = 0, idx = STAGES.length - 1
      for (let i = 0; i < STAGES.length; i++) { acc += STAGES[i].dur; if (elapsed < acc) { idx = i; break } }
      setStage(idx)
      if (elapsed >= total) clearInterval(tick)
    }, 50)
    return () => clearInterval(tick)
  }, [])

  return (
    <div className="card" style={{ display: 'flex', height: '100%', overflow: 'hidden', background: '#141414' }}>

      {/* Left: preview + scan */}
      <div style={{ width: '200px', flexShrink: 0, padding: '14px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <motion.div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <Brain size={12} style={{ color: '#10b981' }} />
          </motion.div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.78rem', color: '#f1f1f1' }}>AI Processing</span>
        </div>

        {/* CNIC scan preview */}
        <div style={{ flex: 1, position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.04)', minHeight: 0 }}>
          {previewUrl
            ? <img src={previewUrl} alt="Scanning" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.75 }} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '80px', height: '50px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)' }} />
              </div>
          }
          {/* Scan line */}
          <motion.div
            style={{ position: 'absolute', insetInline: 0, height: '1.5px', background: 'linear-gradient(90deg,transparent,#10b981,#34d399,transparent)', boxShadow: '0 0 8px rgba(16,185,129,0.7)' }}
            animate={{ top: ['8%', '90%', '8%'] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Corner brackets */}
          {['top-1.5 left-1.5','top-1.5 right-1.5','bottom-1.5 left-1.5','bottom-1.5 right-1.5'].map((pos, i) => (
            <div key={i} className={`absolute w-3 h-3 ${pos}`} style={{ borderTop: i<2?'1.5px solid #10b981':'none', borderBottom: i>=2?'1.5px solid #10b981':'none', borderLeft: i%2===0?'1.5px solid #10b981':'none', borderRight: i%2===1?'1.5px solid #10b981':'none', borderRadius: ['3px 0 0 0','0 3px 0 0','0 0 0 3px','0 0 3px 0'][i] }} />
          ))}
        </div>

        {/* Progress */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#444', marginBottom: '5px' }}>
            <span>Progress</span><span style={{ color: '#10b981' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '2px', borderRadius: '999px', overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
            <motion.div style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg,#10b981,#34d399)', width: `${progress}%`, boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />
          </div>
        </div>
      </div>

      {/* Right: stages */}
      <div style={{ flex: 1, padding: '14px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
        <p style={{ fontSize: '0.62rem', color: '#333', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Stages</p>
        {STAGES.map((s, i) => {
          const done = i < stage, current = i === stage
          return (
            <motion.div key={i}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 10px', borderRadius: '8px', background: current ? 'rgba(16,185,129,0.06)' : 'transparent', border: current ? '1px solid rgba(16,185,129,0.15)' : '1px solid transparent', transition: 'all 0.3s' }}
              animate={{ opacity: i <= stage ? 1 : 0.25 }}
            >
              <span style={{ color: done || current ? '#10b981' : '#333' }}>{s.icon}</span>
              <span style={{ flex: 1, fontSize: '0.72rem', color: done ? '#444' : current ? '#ddd' : '#333', fontFamily: current ? "'JetBrains Mono',monospace" : 'inherit' }}>{s.label}</span>
              {done    && <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 700 }}>✓</span>}
              {current && <span style={{ display: 'flex', gap: '3px' }}>{[0,1,2].map(d=><span key={d} className="load-dot w-1 h-1 rounded-full" style={{ display:'inline-block', background:'#10b981', animationDelay:`${d*-0.12}s` }}/>)}</span>}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
