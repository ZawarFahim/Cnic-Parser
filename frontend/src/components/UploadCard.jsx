import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image as ImageIcon, X, FileCheck, CloudUpload } from 'lucide-react'

const ACCEPTED   = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 10

export default function UploadCard({ onFileSelect, onProcess }) {
  const [dragOver, setDragOver] = useState(false)
  const [preview,  setPreview]  = useState(null)
  const [fileName, setFileName] = useState(null)
  const [fileSize, setFileSize] = useState(null)
  const [error,    setError]    = useState(null)
  const inputRef = useRef(null)

  const handleFile = useCallback((file) => {
    setError(null)
    if (!file) return
    if (!ACCEPTED.includes(file.type)) { setError('Unsupported format. Use JPG, PNG, or WebP.'); return }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) { setError(`Max size is ${MAX_SIZE_MB} MB.`); return }
    const url = URL.createObjectURL(file)
    setPreview(url); setFileName(file.name); setFileSize((file.size / 1024).toFixed(1) + ' KB')
    onFileSelect?.(file)
  }, [onFileSelect])

  const onDrop    = useCallback((e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }, [handleFile])
  const clearFile = () => { setPreview(null); setFileName(null); setFileSize(null); setError(null); if (inputRef.current) inputRef.current.value = '' }

  return (
    <div className="card" style={{ display: 'flex', height: '100%', overflow: 'hidden', background: '#141414' }}>

      {/* ── Left section: Drop zone ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '14px 16px', gap: '10px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.82rem', color: '#f1f1f1' }}>Upload Document</h2>
          {preview && <button className="btn btn-icon" onClick={clearFile}><X size={13} /></button>}
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }}>
                <motion.div
                  style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: dragOver ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${dragOver ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                  }}
                  animate={dragOver ? { scale: [1, 1.08, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <CloudUpload size={20} style={{ color: dragOver ? '#10b981' : '#444' }} />
                </motion.div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.78rem', fontWeight: 500, color: dragOver ? '#10b981' : '#888' }}>
                    {dragOver ? 'Drop to upload' : 'Drop CNIC here'}
                  </p>
                  <p style={{ fontSize: '0.67rem', color: '#444', marginTop: '3px' }}>
                    or <span style={{ color: '#10b981', cursor: 'pointer' }}>browse files</span>
                  </p>
                  <p style={{ fontSize: '0.62rem', color: '#333', marginTop: '6px' }}>JPG · PNG · WebP · max {MAX_SIZE_MB}MB</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="pv"
              style={{ flex: 1, borderRadius: '10px', border: '1px solid rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.04)', overflow: 'hidden', position: 'relative', minHeight: 0 }}
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            >
              <img src={preview} alt="CNIC preview" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              <div style={{ position: 'absolute', top: '7px', left: '7px', display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '999px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontSize: '0.62rem', fontWeight: 600 }}>
                <FileCheck size={9} />Ready
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '7px 11px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: '0.68rem' }}
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <X size={11} style={{ flexShrink: 0 }} />{error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Right section: file info + action ── */}
      <div style={{ width: '160px', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '14px 14px', gap: '10px', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '0.65rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>File Info</p>
          {preview && fileName ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon size={16} style={{ color: '#10b981' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 500, color: '#ccc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '130px' }}>{fileName}</p>
                <p style={{ fontSize: '0.65rem', color: '#555', marginTop: '2px' }}>{fileSize}</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {['Clear image', 'Good lighting', 'Full CNIC visible'].map(tip => (
                <div key={tip} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.67rem', color: '#444' }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {!preview ? (
            <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem', padding: '9px 10px' }} onClick={() => inputRef.current?.click()}>
              <Upload size={12} />Browse
            </button>
          ) : (
            <motion.button className="btn btn-primary" style={{ width: '100%', fontSize: '0.75rem', padding: '9px 10px' }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onProcess}>
              <Upload size={12} />Parse CNIC
            </motion.button>
          )}
        </div>
      </div>

      <input ref={inputRef} type="file" accept={ACCEPTED.join(',')} onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />
    </div>
  )
}
