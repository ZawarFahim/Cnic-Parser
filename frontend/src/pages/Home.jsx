import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scan } from 'lucide-react'
import Logo           from '../components/Logo'
import UploadCard     from '../components/UploadCard'
import ProcessingCard from '../components/ProcessingCard'
import ResultCard     from '../components/ResultCard'
import EmptyState     from '../components/EmptyState'
import ErrorCard      from '../components/ErrorCard'

const STATE = { IDLE: 'idle', PROCESSING: 'processing', RESULT: 'result', ERROR: 'error' }

export default function Home() {
  const [appState,   setAppState]   = useState(STATE.IDLE)
  const [file,       setFile]       = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [extractedData, setExtractedData] = useState(null)

  const handleFileSelect = (f) => { setFile(f); setPreviewUrl(URL.createObjectURL(f)) }
  const handleProcess    = async () => {
    if (!file) return
    setAppState(STATE.PROCESSING)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('http://localhost:8000/extract', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Failed to parse CNIC document.')
      }
      
      const data = await response.json()
      
      // Map schema response (name, father_name, cnic_number, gender, date_of_birth, date_of_issue, date_of_expiry, address)
      // to fields expected by ResultCard (fullName, fatherName, cnic, gender, dob, doi, doe, address)
      const mappedData = {
        fullName: data.name || '',
        fatherName: data.father_name || '',
        cnic: data.cnic_number || '',
        gender: data.gender || '',
        dob: data.date_of_birth || '',
        doi: data.date_of_issue || '',
        doe: data.date_of_expiry || '',
        address: data.address || ''
      }
      
      setExtractedData(mappedData)
      setAppState(STATE.RESULT)
    } catch (err) {
      setAppState(STATE.ERROR)
    }
  }
  const handleReset      = () => { setFile(null); if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(null); setExtractedData(null); setAppState(STATE.IDLE) }
  const handleRetry      = () => { handleProcess() }

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }, [previewUrl])

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#0d0d0d' }}>

      {/* Subtle background grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        zIndex: 0,
      }} />
      {/* Green radial glow - top left */}
      <div className="fixed pointer-events-none" style={{
        top: 0, left: 0, width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 65%)',
        zIndex: 0,
      }} />

      {/* ─── HEADER ─── */}
      <header style={{
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 36px',
        height: '64px',
        background: '#111111',
        borderBottom: '1px solid rgba(16,185,129,0.15)',
      }}>
        {/* Green top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #10b981, #34d399, transparent)' }} />

        {/* Logo + name + tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Logo size="md" variant="icon" animate={false} />
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.025em', lineHeight: 1, color: '#f1f1f1' }}>
              CNIC<span className="gradient-text">.io</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#555', marginTop: '3px', fontStyle: 'italic', letterSpacing: '0.01em' }}>
              Drop the ID. We'll do the rest.
            </div>
          </div>
        </div>

        {/* AI badge */}
        <span className="badge badge-brand" style={{ fontSize: '0.62rem' }}>
          <Scan size={9} />
          AI Powered
        </span>
      </header>

      {/* ─── MAIN: Vertical Stack ─── */}
      <main style={{
        flex: 1,
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px 36px',
        minHeight: 0,
        overflow: 'hidden',
      }}>

        {/* ── TOP: Upload / Processing (fixed height) ── */}
        <div style={{ flexShrink: 0, height: '260px' }}>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.7rem', color: '#555', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Upload CNIC
          </p>
          <div style={{ height: 'calc(100% - 24px)' }}>
            <AnimatePresence mode="wait">
              {(appState === STATE.IDLE || appState === STATE.RESULT || appState === STATE.ERROR) && (
                <motion.div key="upload" style={{ height: '100%' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <UploadCard onFileSelect={handleFileSelect} onProcess={handleProcess} />
                </motion.div>
              )}
              {appState === STATE.PROCESSING && (
                <motion.div key="proc" style={{ height: '100%' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <ProcessingCard previewUrl={previewUrl} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── BOTTOM: Extracted Data (fills remaining space, vertically centered) ── */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.7rem', color: '#555', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>
            Extracted Data
          </p>

          {/* Scrollable result container, content vertically centered when empty */}
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence mode="wait">

              {/* IDLE — centered empty state */}
              {appState === STATE.IDLE && (
                <motion.div key="empty" className="card"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <EmptyState />
                </motion.div>
              )}

              {/* PROCESSING — centered spinner */}
              {appState === STATE.PROCESSING && (
                <motion.div key="proc-wait" className="card"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}>
                      <Scan size={24} style={{ color: '#10b981' }} />
                    </motion.div>
                    <p style={{ fontSize: '0.72rem', color: '#555', fontFamily: "'JetBrains Mono',monospace" }}>Analyzing document…</p>
                  </div>
                </motion.div>
              )}

              {/* RESULT — full result card */}
              {appState === STATE.RESULT && (
                <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <ResultCard data={extractedData} onReset={handleReset} />
                </motion.div>
              )}

              {/* ERROR */}
              {appState === STATE.ERROR && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ErrorCard type="failed_extraction" onRetry={handleRetry} onReset={handleReset} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer style={{
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px',
        background: '#111111',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <p style={{ fontSize: '0.62rem', color: '#333', fontFamily: "'JetBrains Mono',monospace" }}>
          © {new Date().getFullYear()} CNIC.io — AI-powered identity parsing
        </p>
      </footer>
    </div>
  )
}
