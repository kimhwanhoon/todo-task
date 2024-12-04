interface Props {
  size?: number
  stroke?: number
  color?: string
  className?: string
}

export const ChevronRight = ({
  size = 16,
  stroke = 2,
  color = '#ABB5BE',
  className,
}: Props) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 6l6 6l-6 6" />
    </svg>
  )
}
