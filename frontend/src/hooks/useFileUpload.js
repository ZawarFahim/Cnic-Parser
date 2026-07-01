import { useState, useCallback } from 'react'

/**
 * useFileUpload — manages file selection, validation, and preview URL
 *
 * @param {Object} opts
 * @param {string[]} opts.accept  - Accepted MIME types
 * @param {number}   opts.maxMB   - Max file size in megabytes
 */
export function useFileUpload({
  accept = ['image/jpeg', 'image/png', 'image/webp'],
  maxMB  = 10,
} = {}) {
  const [file,       setFile]       = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error,      setError]      = useState(null)

  const handleFile = useCallback((incoming) => {
    setError(null)
    if (!incoming) return

    if (!accept.includes(incoming.type)) {
      setError(`Unsupported format. Accepted: ${accept.map(t => t.split('/')[1].toUpperCase()).join(', ')}`)
      return
    }
    if (incoming.size > maxMB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${maxMB} MB.`)
      return
    }

    // Revoke previous URL
    if (previewUrl) URL.revokeObjectURL(previewUrl)

    const url = URL.createObjectURL(incoming)
    setFile(incoming)
    setPreviewUrl(url)
  }, [accept, maxMB, previewUrl])

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(null)
    setPreviewUrl(null)
    setError(null)
  }, [previewUrl])

  return { file, previewUrl, error, handleFile, clearFile }
}
