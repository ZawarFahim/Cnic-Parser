import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, FileCheck, CloudUpload } from 'lucide-react'

const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 10

export default function UploadCard({ title, subtitle, file, preview, error, onFileSelect, onClear }) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  const handleFile = useCallback((f) => {
    if (!f) return
    onFileSelect?.(f)
  }, [onFileSelect])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }, [handleFile])

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', overflow: 'hidden', background: '#141414', padding: '14px 16px', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.82rem', color: '#f1f1f1' }}>{title}</h2>
          <p style={{ fontSize: '0.65rem', color: '#666', marginTop: '2px' }}>{subtitle}</p>
        </div>
        {preview && (
          <button className="btn btn-icon" onClick={onClear}>
            <X size={13} />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div key="dz"
            style={{
              flex: 1, borderRadius: '10px', cursor: 'pointer',
              border: `1.5px dashed ${dragOver ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
              background: dragOver ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease', minHeight: 0,
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            whileHover={{ borderColor: '#10b981', background: 'rgba(16,185,129,0.04)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '10px', textAlign: 'center' }}>
              <motion.div
                style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: dragOver ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${dragOver ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                  marginBottom: '2px'
                }}
                animate={dragOver ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <CloudUpload size={18} style={{ color: dragOver ? '#10b981' : '#444' }} />
              </motion.div>
              <p style={{ fontSize: '0.74rem', fontWeight: 500, color: dragOver ? '#10b981' : '#888' }}>
                {dragOver ? 'Drop to upload' : 'Drag & drop image'}
              </p>
              <p style={{ fontSize: '0.64rem', color: '#444' }}>
                or <span style={{ color: '#10b981' }}>browse files</span>
              </p>
              <p style={{ fontSize: '0.58rem', color: '#333', marginTop: '2px' }}>JPG · PNG · WebP · max {MAX_SIZE_MB}MB</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="pv"
            style={{ flex: 1, borderRadius: '10px', border: '1px solid rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.04)', overflow: 'hidden', position: 'relative', minHeight: 0 }}
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          >
            <img src={preview} alt={`${title} preview`} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            <div style={{ position: 'absolute', top: '7px', left: '7px', display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '999px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontSize: '0.62rem', fontWeight: 600 }}>
              <FileCheck size={9} />Ready
            </div>
            {file && (
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '6px 8px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.62rem', color: '#aaa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{file.name}</span>
                <span style={{ fontSize: '0.58rem', color: '#666' }}>{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: '0.65rem' }}
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          >
            <X size={11} style={{ flexShrink: 0 }} />{error}
          </motion.div>
        )}
      </AnimatePresence>

      <input ref={inputRef} type="file" accept={ACCEPTED.join(',')} onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />
    </div>
  )
}
