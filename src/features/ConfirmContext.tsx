import { createContext, useContext, ReactNode, useState } from "react"

interface InitialValueProps {
  open: boolean
  setOpen: (o: boolean) => void
  action: ((fn: () => void) => void) | null
}

const ConfirmContext = createContext({} as InitialValueProps)

export default function useConfirmContext() {
  return useContext(ConfirmContext)
}

export function ConfirmContextPovider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const action = (fn: () => void) => {
    fn()
  }

  return (
    <ConfirmContext.Provider value={{ open, setOpen, action }}>
      {children}
    </ConfirmContext.Provider>
  )
}
