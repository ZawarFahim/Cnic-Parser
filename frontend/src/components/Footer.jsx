import React from 'react'
import { motion } from 'framer-motion'
import { GitFork, MessageCircle, Link, Heart } from 'lucide-react'
import Logo from './Logo'

/* ─────────────────────────────────────────────
   Footer — site footer with links & branding
───────────────────────────────────────────── */

const FOOTER_LINKS = {
  Product:   ['Features', 'How it Works', 'API Docs', 'Changelog'],
  Company:   ['About', 'Blog', 'Careers', 'Press Kit'],
  Legal:     ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  Support:   ['Documentation', 'FAQs', 'Contact', 'Status'],
}

const SOCIALS = [
  { icon: <GitFork size={16} />,       href: 'https://github.com',   label: 'GitHub' },
  { icon: <MessageCircle size={16} />, href: 'https://twitter.com',  label: 'Twitter' },
  { icon: <Link size={16} />,          href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <motion.footer
      className="relative mt-auto"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(2,6,23,0.8)',
        backdropFilter: 'blur(20px)',
        zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Top gradient line */}
      <div
        className="h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), rgba(59,130,246,0.3), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Top row: brand + links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Logo size="sm" variant="full" animate={false} />
            <p className="text-slate-500 text-sm leading-relaxed">
              AI-powered CNIC parsing. Fast, accurate, and private.
            </p>
            {/* Social links */}
            <div className="flex gap-2">
              {SOCIALS.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-icon"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-3">
              <h4 className="text-slate-300 font-medium text-sm">{group}</h4>
              <ul className="flex flex-col gap-2">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-600 text-sm hover:text-slate-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} CNIC.io. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            Built with <Heart size={11} style={{ color: '#f87171' }} /> in Pakistan
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
