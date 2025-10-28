import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (options.triggerOnce) {
            observer.unobserve(entry.target)
          }
        } else if (!options.triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin, options.triggerOnce])

  return { ref, isVisible }
}

export const getStaggerDelay = (index: number, baseDelay: number = 100) => {
  return index * baseDelay
}

export const animationVariants = {
  fadeInUp: (isVisible: boolean, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
  }),
  
  fadeInLeft: (isVisible: boolean, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
  }),
  
  fadeInRight: (isVisible: boolean, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
  }),
  
  scaleIn: (isVisible: boolean, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
  }),
  
  slideInUp: (isVisible: boolean, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
  })
}
