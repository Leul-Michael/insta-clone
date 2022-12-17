import { useState, useEffect } from "react"

export default function useDebounceValue(value: string, delay: number): string {
  const [debounceValue, setDebounceValue] = useState<string>("")

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timeOut)
    }
  }, [value])

  return debounceValue
}
