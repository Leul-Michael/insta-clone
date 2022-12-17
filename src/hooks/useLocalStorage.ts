import { useEffect, useState } from "react"

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)

    if (jsonValue) return JSON.parse(jsonValue)

    if (typeof initialValue === "function") {
      return (initialValue as () => T)()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}
