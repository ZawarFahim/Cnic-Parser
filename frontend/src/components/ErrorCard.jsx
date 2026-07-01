import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCcw, FileX, ImageOff, WifiOff } from 'lucide-react'

const ERROR_TYPES = {
  invalid_image:      { icon: <ImageOff size={18} />,     title: 'Invalid Image',      message: 'Not a valid image file. Use JPG, PNG, or WebP.',            hint: 'Ensure the file is not corrupted and under 10 MB.' },
  unsupported_format: { icon: <FileX size={18} />,         title: 'Unsupported Format', message: 'Only JPG, PNG, and WebP images are accepted.',               hint: 'Convert your file and try again.' },
  failed_extraction:  { icon: <AlertTriangle size={18} />, title: 'Extraction Failed',  message: 'AI could not read the CNIC. Image may be blurry or cropped.', hint: 'Use a clear, straight-on, well-lit photo.' },
  network_error:      { icon: <WifiOff size={18} />,       title: 'Connection Error',   message: 'Unable to reach AI service.',                                hint: 'Check your connection and refresh.' },
}

export default function ErrorCard({ type = 'failed_extraction', custom, onRetry, onReset }) {
  const err = custom || ERROR_TYPES[type]
  return (
    <motion.div
      className="card"
      style={{ overflow: 'hidden', background: '#141414' }}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
    >
      <div style={{ height: '2px', background: 'linear-gradient(90deg,transparent,#f87171,#fca5a5,transparent)' }} />
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#f87171' }}>
            {err.icon}
          </div>
          <div>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#f1f1f1' }}>{err.title}</h3>
            <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '4px', lineHeight: 1.5 }}>{err.message}</p>
          </div>
        </div>
        {err.hint && (
          <div style={{ display: 'flex', gap: '8px', padding: '8px 11px', borderRadius: '8px', background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)', fontSize: '0.68rem', color: '#a16207', lineHeight: 1.5 }}>
            <span style={{ flexShrink: 0 }}>💡</span>{err.hint}
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px' }}>
          {onRetry && (
            <motion.button className="btn btn-primary" style={{ flex: 1, fontSize: '0.75rem', padding: '8px' }} whileTap={{ scale: 0.97 }} onClick={onRetry}>
              <RefreshCcw size={12} />Try Again
            </motion.button>
          )}
          {onReset && (
            <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.75rem', padding: '8px' }} onClick={onReset}>
              Upload Different
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
