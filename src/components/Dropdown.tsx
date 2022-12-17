import { ReactNode, useEffect, useRef, useState } from "react"
import dropdownStyles from "../styles/Dropdown.module.css"

export enum DirectionType {
  TO_TOP = "to-top",
  TO_BOTTOM = "to-bottom",
}

interface Option {
  key: number
  value: string
  action?: () => void
  icon?: ReactNode
}

interface DropdownProps {
  icon: ReactNode
  main?: string
  options: Option[]
  direction: DirectionType
}

function Dropdown({ main, options, direction, icon }: DropdownProps) {
  const dropDownRef = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleToggle = (e: MouseEvent) => {
      if (e.target !== dropDownRef.current) return
      setIsOpen((prev) => !prev)
    }

    dropDownRef.current?.addEventListener("click", handleToggle)

    return () => dropDownRef.current?.removeEventListener("click", handleToggle)
  }, [isOpen])

  return (
    <ul
      tabIndex={0}
      ref={dropDownRef}
      onBlur={() => setIsOpen(false)}
      className={`${dropdownStyles.container} ${
        direction === DirectionType.TO_BOTTOM
          ? dropdownStyles.down
          : dropdownStyles.up
      } ${!main ? dropdownStyles.fe : ""}`}
    >
      <span className={`${dropdownStyles.icon}`}>{icon}</span>
      <span className={`${dropdownStyles.text}`}>{main}</span>
      <div
        className={`${dropdownStyles.lists} ${
          isOpen ? dropdownStyles.show : ""
        }`}
      >
        {options.map((option) => (
          <li
            onClick={option?.action}
            className={dropdownStyles.list}
            key={option.key}
          >
            <span className={`${dropdownStyles.icon}`}>{option?.icon}</span>{" "}
            <span className={`${dropdownStyles.text}`}>{option.value}</span>
          </li>
        ))}
      </div>
    </ul>
  )
}

export default Dropdown
