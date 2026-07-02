import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Users, CreditCard, Zap, Calendar, MapPin, Copy, Check, BadgeCheck } from 'lucide-react'

export function FieldCard({ icon, label, value, index = 0, fullWidth = false }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {}
  }
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '9px',
        padding: '8px 10px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.2s',
        cursor: 'default',
        position: 'relative',
        gridColumn: fullWidth ? 'span 2' : 'auto'
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ background: 'rgba(16,185,129,0.04)', borderColor: 'rgba(16,185,129,0.15)' }}
    >
      <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ color: '#10b981' }}>{icon}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: '#444', marginBottom: '2px' }}>{label}</p>
        <p style={{ fontSize: '0.78rem', fontWeight: 500, color: '#e0e0e0', wordBreak: 'break-word', lineHeight: 1.35, fontFamily: label === 'CNIC Number' ? "'JetBrains Mono',monospace" : 'inherit' }}>{value}</p>
      </div>
      <button
        style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '5px', padding: '3px', cursor: 'pointer', opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={handleCopy}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0}
      >
        {copied ? <Check size={10} style={{ color: '#10b981' }} /> : <Copy size={10} style={{ color: '#555' }} />}
      </button>
    </motion.div>
  )
}

const MOCK = {
  fullName: 'Muhammad Ali Khan', fatherName: 'Khan Bahadur',
  cnic: '35202-1234567-8', gender: 'Male',
  dob: '01-01-1990', doi: '15-03-2018', doe: '14-03-2028',
  address: 'House 12, Street 5, Block B, Model Town, Lahore',
}

const FIELDS = [
  { icon: <User size={12} />,       label: 'Full Name',      key: 'fullName'   },
  { icon: <Users size={12} />,      label: "Father's Name",  key: 'fatherName' },
  { icon: <CreditCard size={12} />, label: 'CNIC Number',    key: 'cnic'       },
  { icon: <Zap size={12} />,        label: 'Gender',         key: 'gender'     },
  { icon: <Calendar size={12} />,   label: 'Date of Birth',  key: 'dob'        },
  { icon: <Calendar size={12} />,   label: 'Date of Issue',  key: 'doi'        },
  { icon: <Calendar size={12} />,   label: 'Date of Expiry', key: 'doe'        },
  { icon: <MapPin size={12} />,     label: 'Address',        key: 'address'    },
]

export default function ResultCard({ data = MOCK, onReset }) {
  const [copiedAll, setCopiedAll] = useState(false)
  const handleCopyAll = async () => {
    const text = FIELDS.map(f => `${f.label}: ${data[f.key]}`).join('\n')
    try { await navigator.clipboard.writeText(text); setCopiedAll(true); setTimeout(() => setCopiedAll(false), 2500) } catch {}
  }
  return (
    <div className="card" style={{ overflow: 'hidden', background: '#141414' }}>
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #10b981, #34d399, transparent)', boxShadow: '0 0 12px rgba(16,185,129,0.4)' }} />

      <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.div
              style={{ width: '32px', height: '32px', borderRadius: '999px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            >
              <BadgeCheck size={16} style={{ color: '#10b981' }} />
            </motion.div>
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '0.875rem', color: '#f1f1f1' }}>Extraction Complete</h2>
              <span className="badge badge-success" style={{ marginTop: '3px', display: 'inline-flex', fontSize: '0.58rem' }}>✓ 8 fields extracted</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <motion.button className="btn btn-ghost" style={{ fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={handleCopyAll} whileTap={{ scale: 0.95 }}>
              {copiedAll ? <Check size={10} style={{ color: '#10b981' }} /> : <Copy size={10} />}
              {copiedAll ? 'Copied!' : 'Copy All'}
            </motion.button>
            {onReset && <button className="btn btn-ghost" style={{ fontSize: '0.68rem' }} onClick={onReset}>New Scan</button>}
          </div>
        </div>

        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#444', marginBottom: '4px' }}>
            <span>Confidence Score</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>99.8%</span>
          </div>
          <div style={{ height: '2px', borderRadius: '999px', overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
            <motion.div style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg,#10b981,#34d399)', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }}
              initial={{ width: 0 }} animate={{ width: '99.8%' }} transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
          {FIELDS.map((f, i) => <FieldCard key={f.key} icon={f.icon} label={f.label} value={data[f.key]} index={i} fullWidth={f.key === 'address'} />)}
        </div>
      </div>

      <p style={{ textAlign: 'center', padding: '0 16px 10px', fontSize: '0.58rem', color: '#333', fontFamily: "'JetBrains Mono',monospace" }}>
        Always verify against the original document.
      </p>
    </div>
  )
}
