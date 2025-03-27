"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

// Define the gallery items
const galleryItems = [
  {
    id: 1,
    title: "Digital Design",
    image: "/images/design.jpg",
  },
  {
    id: 2,
    title: "Web Development",
    image: "/images/development.jpg",
  },
  {
    id: 3,
    title: "Brand Strategy",
    image: "/images/strategy.jpg",
  },
]

export default function HeroGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Handle mouse movement for the parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (activeIndex === index) {
      const rect = itemRefs.current[index]?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
      }
    }
  }

  // Apply the parallax effect to the active image
  useEffect(() => {
    if (activeIndex !== null) {
      const activeItem = itemRefs.current[activeIndex]
      if (activeItem) {
        const rect = activeItem.getBoundingClientRect()
        const xPercent = (mousePosition.x / rect.width - 0.5) * 10
        const yPercent = (mousePosition.y / rect.height - 0.5) * 10

        gsap.to(activeItem.querySelector(".image-container"), {
          x: xPercent,
          y: yPercent,
          duration: 0.5,
          ease: "power2.out",
        })
      }
    }
  }, [mousePosition, activeIndex])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {galleryItems.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => (itemRefs.current[index] = el)}
          className={cn(
            "hero-gallery-item relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer transition-all duration-500",
            activeIndex === index ? "scale-105 z-10" : "scale-100 z-0",
          )}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          onMouseMove={(e) => handleMouseMove(e, index)}
        >
          <div className="image-container absolute inset-0 w-full h-full transition-transform duration-500">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className={cn(
                "object-cover transition-all duration-500",
                activeIndex === null || activeIndex === index
                  ? "opacity-100 filter-none"
                  : "opacity-70 grayscale contrast-125 brightness-110",
              )}
            />
            <div
              className={cn(
                "absolute inset-0 bg-black/30 transition-opacity duration-500",
                activeIndex === index ? "opacity-0" : "opacity-50",
              )}
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 z-10">
            <h3
              className={cn(
                "text-xl font-bold transition-all duration-300",
                activeIndex === index ? "text-white scale-110 translate-x-2" : "text-gray-200",
              )}
            >
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}

