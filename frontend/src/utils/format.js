/**
 * utils/format.js — CNIC.io formatting helpers
 */

/**
 * Format a raw CNIC number string as XXXXX-XXXXXXX-X
 * @param {string} raw
 * @returns {string}
 */
export function formatCnic(raw) {
  const digits = (raw || '').replace(/\D/g, '')
  if (digits.length !== 13) return raw
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`
}

/**
 * Format a date string DD-MM-YYYY or YYYY-MM-DD to a readable form
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return dateStr
  const parts = dateStr.split(/[-/]/)
  if (parts.length !== 3) return dateStr
  // Detect YYYY-MM-DD vs DD-MM-YYYY
  const isISO = parts[0].length === 4
  const [y, m, d] = isISO
    ? parts
    : [parts[2], parts[1], parts[0]]
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const month = months[parseInt(m, 10) - 1] || m
  return `${d} ${month} ${y}`
}

/**
 * Truncate a string to maxLen characters with ellipsis
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(str, maxLen = 40) {
  if (!str || str.length <= maxLen) return str
  return str.slice(0, maxLen).trimEnd() + '…'
}

/**
 * Format file size bytes → human-readable string
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes < 1024)        return `${bytes} B`
  if (bytes < 1024 ** 2)   return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`
}
