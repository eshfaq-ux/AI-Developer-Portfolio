'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null
})

interface Spline3DProps {
  scene: string
  fallbackImage: string
  alt: string
  className?: string
  priority?: boolean
}

const Spline3D = ({ scene, fallbackImage, alt, className = '', priority = false }: Spline3DProps) => {
  const [showFallback, setShowFallback] = useState(true)
  const [splineLoaded, setSplineLoaded] = useState(false)

  useEffect(() => {
    // Temporarily disable 3D due to invalid scene URLs
    // TODO: Replace with valid Spline scene URLs
    setShowFallback(true)
    return
    
    // Check WebGL support
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      setShowFallback(true)
      return
    }

    // Timeout fallback after 5 seconds
    const timeout = setTimeout(() => {
      setShowFallback(true)
    }, 5000)

    // Enable Spline loading
    setShowFallback(false)

    return () => clearTimeout(timeout)
  }, [])

  const handleSplineLoad = () => {
    setSplineLoaded(true)
  }

  const handleSplineError = (error: any) => {
    console.warn('Spline loading failed, using fallback:', error)
    setShowFallback(true)
  }

  return (
    <div className={`relative ${className}`}>
      {!showFallback && (
        <Suspense fallback={null}>
          <div className="w-full h-full">
            <Spline
              scene={scene}
              onLoad={handleSplineLoad}
              onError={handleSplineError}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Suspense>
      )}
      
      {(showFallback || !splineLoaded) && (
        <motion.img
          src={fallbackImage}
          alt={alt}
          className="w-full h-full object-cover filter contrast-125 brightness-110 saturate-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  )
}

export default Spline3D
