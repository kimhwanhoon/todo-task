import clsx from 'clsx'
import { useRef } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  classNames?: {
    container?: string
    input?: string
  }
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
}

export const TextInput = ({
  value,
  onChange,
  classNames,
  leftSection,
  rightSection,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={clsx([
        // base
        'flex items-center gap-2 justify-between px-2 py-1 rounded-md border border-[#DEE2E5] cursor-text',
        // focus
        'focus-within:ring-blue-500 focus-within:ring-1',
        // hover
        'hover:ring-blue-500 hover:ring-1',

        // added classNames
        classNames?.container,
      ])}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Left Section */}
      {leftSection}

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx([
          // base
          'text-[#222] placeholder:text-[#ABB5BE] outline-none',
          // added classNames
          classNames?.input,
        ])}
      />

      {/* Right Section */}
      {rightSection}
    </div>
  )
}
