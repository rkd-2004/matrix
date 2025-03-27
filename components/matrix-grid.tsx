"use client"

import { useState, useEffect } from "react"
import MatrixBox from "./matrix-box"

export default function MatrixGrid() {
  // Create a 3x3 matrix (9 boxes)
  const totalBoxes = 9

  // Track clicked boxes and their order
  const [clickedBoxes, setClickedBoxes] = useState<number[]>([])
  const [boxColors, setBoxColors] = useState<string[]>(Array(totalBoxes).fill("bg-white"))
  const [allClicked, setAllClicked] = useState(false)
  const [animating, setAnimating] = useState(false)

  // Handle box click
  const handleBoxClick = (index: number) => {
    // If already clicked or animation in progress, do nothing
    if (clickedBoxes.includes(index) || animating) return

    // Add to clicked boxes array
    const newClickedBoxes = [...clickedBoxes, index]
    setClickedBoxes(newClickedBoxes)

    // Update color to green
    const newColors = [...boxColors]
    newColors[index] = "bg-green-500"
    setBoxColors(newColors)

    // Check if all boxes have been clicked
    if (newClickedBoxes.length === totalBoxes) {
      setAllClicked(true)
    }
  }

  // Handle the orange sequence animation when all boxes are clicked
  useEffect(() => {
    if (allClicked && !animating) {
      setAnimating(true)

      // Animate boxes to orange in the order they were clicked
      const animateBoxes = async () => {
        const newColors = [...boxColors]

        // Animate each box with a delay
        for (let i = 0; i < clickedBoxes.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 500))
          newColors[clickedBoxes[i]] = "bg-orange-500"
          setBoxColors([...newColors])
        }

        // Reset after animation completes
        setTimeout(() => {
          setClickedBoxes([])
          setBoxColors(Array(totalBoxes).fill("bg-white"))
          setAllClicked(false)
          setAnimating(false)
        }, 2000)
      }

      animateBoxes()
    }
  }, [allClicked])

  // Create the 3x3 grid
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: totalBoxes }).map((_, index) => (
        <MatrixBox key={index} index={index} color={boxColors[index]} onClick={() => handleBoxClick(index)} />
      ))}
    </div>
  )
}

