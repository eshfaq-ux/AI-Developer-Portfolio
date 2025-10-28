// Performance monitoring for 3D content and overall site performance

export const measurePerformance = () => {
  if (typeof window === 'undefined') return

  // Core Web Vitals monitoring
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime)
      }
      if (entry.entryType === 'first-input') {
        const fidEntry = entry as any
        console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
      }
      if (entry.entryType === 'layout-shift') {
        const clsEntry = entry as any
        if (!clsEntry.hadRecentInput) {
          console.log('CLS:', clsEntry.value)
        }
      }
    }
  })

  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
}

export const checkWebGLPerformance = () => {
  if (typeof window === 'undefined') return false

  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  
  if (!gl) return false

  const webglContext = gl as any
  const debugInfo = webglContext.getExtension('WEBGL_debug_renderer_info')
  const renderer = debugInfo ? webglContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown'
  
  console.log('WebGL Renderer:', renderer)
  
  const isHighPerformance = !renderer.toLowerCase().includes('software') && 
                           !renderer.toLowerCase().includes('llvmpipe')
  
  return isHighPerformance
}

export const optimizeForDevice = () => {
  if (typeof window === 'undefined') return 'high'

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
  const hasLimitedMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4

  if (isMobile || isLowEnd || hasLimitedMemory) {
    return 'low'
  }

  return checkWebGLPerformance() ? 'high' : 'medium'
}
