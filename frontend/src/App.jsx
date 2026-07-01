import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen    from './components/LoadingScreen'
import Home             from './pages/Home'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && <Home />}
    </>
  )
}
