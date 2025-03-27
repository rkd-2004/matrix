"use client"
import MatrixGrid from "@/components/matrix-grid"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">3x3 Matrix Click Sequence</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <MatrixGrid />
      </div>

      <div className="mt-8 text-gray-700">
        <p>Instructions:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Click on any box to turn it green</li>
          <li>When you click the last box, all boxes will turn orange in the order they were clicked</li>
        </ul>
      </div>
    </main>
  )
}

