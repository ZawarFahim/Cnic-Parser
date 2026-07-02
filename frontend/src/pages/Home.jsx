import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scan } from 'lucide-react'
import Logo           from '../components/Logo'
import UploadCard     from '../components/UploadCard'
import ProcessingCard from '../components/ProcessingCard'
import ResultCard     from '../components/ResultCard'
import ErrorCard      from '../components/ErrorCard'
import { useFileUpload } from '../hooks/useFileUpload'

const STATE = { IDLE: 'idle', PROCESSING: 'processing', RESULT: 'result', ERROR: 'error' }

export default function Home() {
  const [appState, setAppState] = useState(STATE.IDLE)
  const [extractedData, setExtractedData] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const frontUpload = useFileUpload()
  const backUpload = useFileUpload()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleProcess = async () => {
    if (!frontUpload.file || !backUpload.file) {
      return
    }
    setAppState(STATE.PROCESSING)
    try {
      const formData = new FormData()
      formData.append('front_image', frontUpload.file)
      formData.append('back_image', backUpload.file)

      const response = await fetch('http://localhost:8000/cnic/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to parse CNIC document.')
      }

      const result = await response.json()
      const data = result.data || {}

      const mappedData = {
        fullName: data.name || '',
        fatherName: data.father_name || '',
        cnic: data.cnic_number || '',
        gender: 'N/A',
        dob: data.date_of_birth || '',
        doi: 'N/A',
        doe: data.expiry_date || '',
        address: data.address || ''
      }

      setExtractedData(mappedData)
      setAppState(STATE.RESULT)
    } catch (err) {
      setAppState(STATE.ERROR)
    }
  }

  const handleReset = () => {
    frontUpload.clearFile()
    backUpload.clearFile()
    setExtractedData(null)
    setAppState(STATE.IDLE)
  }

  const handleRetry = () => {
    handleProcess()
  }

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#0d0d0d' }}>
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        zIndex: 0,
      }} />
      <div className="fixed pointer-events-none" style={{
        top: 0, left: 0, width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 65%)',
        zIndex: 0,
      }} />

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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #10b981, #34d399, transparent)' }} />

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

        <span className="badge badge-brand" style={{ fontSize: '0.62rem' }}>
          <Scan size={9} />
          AI Powered
        </span>
      </header>

      <main style={{
        flex: 1,
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 36px',
        overflowY: 'auto',
        minHeight: 0,
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <AnimatePresence mode="wait">
            {appState === STATE.IDLE && (
              <motion.div
                key="idle-upload"
                style={{ width: '100%' }}
                initial={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: -30,
                  transition: { duration: 0.5, ease: 'easeInOut' }
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '16px', width: '100%', flexDirection: isMobile ? 'column' : 'row', height: isMobile ? 'auto' : '260px' }}>
                    <div style={{ flex: 1, height: isMobile ? '230px' : '100%' }}>
                      <UploadCard
                        title="Front Side"
                        subtitle="Upload the front image of your CNIC"
                        file={frontUpload.file}
                        preview={frontUpload.previewUrl}
                        error={frontUpload.error}
                        onFileSelect={frontUpload.handleFile}
                        onClear={frontUpload.clearFile}
                      />
                    </div>
                    <div style={{ flex: 1, height: isMobile ? '230px' : '100%' }}>
                      <UploadCard
                        title="Back Side"
                        subtitle="Upload the back image of your CNIC"
                        file={backUpload.file}
                        preview={backUpload.previewUrl}
                        error={backUpload.error}
                        onFileSelect={backUpload.handleFile}
                        onClear={backUpload.clearFile}
                      />
                    </div>
                  </div>

                  <motion.button
                    className="btn btn-primary"
                    disabled={!frontUpload.file || !backUpload.file}
                    onClick={handleProcess}
                    style={{
                      fontSize: '0.78rem',
                      padding: '9px 20px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      opacity: (!frontUpload.file || !backUpload.file) ? 0.5 : 1,
                      cursor: (!frontUpload.file || !backUpload.file) ? 'not-allowed' : 'pointer',
                      boxShadow: (frontUpload.file && backUpload.file) ? '0 4px 12px rgba(16,185,129,0.25)' : 'none',
                    }}
                    whileHover={frontUpload.file && backUpload.file ? { scale: 1.03 } : {}}
                    whileTap={frontUpload.file && backUpload.file ? { scale: 0.97 } : {}}
                  >
                    <Scan size={13} />
                    Extract Information
                  </motion.button>
                </div>
              </motion.div>
            )}

            {appState === STATE.PROCESSING && (
              <motion.div
                key="processing-loader"
                style={{ width: '100%' }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div style={{ height: '320px' }}>
                  <ProcessingCard previewUrl={frontUpload.previewUrl} />
                </div>
              </motion.div>
            )}

            {appState === STATE.RESULT && (
              <motion.div
                key="result-card"
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: 20,
                  transition: { duration: 0.4, ease: 'easeInOut' }
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <ResultCard data={extractedData} onReset={handleReset} />
                
                <motion.button
                  className="btn btn-primary"
                  style={{
                    fontSize: '0.78rem',
                    padding: '9px 20px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(16,185,129,0.25)',
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleReset}
                >
                  <Scan size={13} />
                  Scan Another CNIC
                </motion.button>
              </motion.div>
            )}

            {appState === STATE.ERROR && (
              <motion.div
                key="error-card"
                style={{ width: '100%' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorCard type="failed_extraction" onRetry={handleRetry} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

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
