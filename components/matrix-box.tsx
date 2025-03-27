"use client"

interface MatrixBoxProps {
  index: number
  color: string
  onClick: () => void
}

export default function MatrixBox({ index, color, onClick }: MatrixBoxProps) {
  return (
    <div
      className={`w-24 h-24 border-2 border-gray-300 rounded-md cursor-pointer flex items-center justify-center transition-colors duration-300 ${color}`}
      onClick={onClick}
    >
      <span className="text-gray-500 font-medium">{index + 1}</span>
    </div>
  )
}

