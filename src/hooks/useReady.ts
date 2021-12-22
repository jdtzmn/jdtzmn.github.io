import { useState, useEffect } from 'react'

// Hook to check if the document is ready
export default function useReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return ready
}
