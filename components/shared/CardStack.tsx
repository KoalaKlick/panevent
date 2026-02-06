"use client"

import { type ReactNode, useCallback, useEffect, useState } from "react"
import { motion } from "motion/react"

interface CardStackProps {
    children: ReactNode[]
    /** Time between auto-transitions in ms */
    interval?: number
    /** Whether to auto-play the transitions */
    autoPlay?: boolean
    /** Card width */
    width?: number | string
    /** Card height */
    height?: number | string
    /** Offset between stacked cards (in px) */
    stackOffset?: number
    /** Scale reduction per card in stack */
    scaleStep?: number
    /** Optional className for the container */
    className?: string
}

export function CardStack({
    children,
    interval = 3000,
    autoPlay = true,
    width = 320,
    height = 200,
    stackOffset = 12,
    scaleStep = 0.05,
    className = "",
}: Readonly<CardStackProps>) {
    const [activeIndex, setActiveIndex] = useState(0)
    const cardCount = children.length

    const nextCard = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % cardCount)
    }, [cardCount])

    useEffect(() => {
        if (!autoPlay || cardCount <= 1) return

        const timer = setInterval(nextCard, interval)
        return () => clearInterval(timer)
    }, [autoPlay, interval, nextCard, cardCount])

    // Calculate distance from front for each card index
    const getDistanceFromFront = (cardIndex: number) => {
        // How many positions behind the active card
        const diff = cardIndex - activeIndex
        // Wrap around for circular stack
        return diff < 0 ? diff + cardCount : diff
    }

    return (
        <div
            className={`relative ${className}`}
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height + stackOffset * (cardCount - 1)}px` : height,
            }}
        >
            {children.map((child, cardIndex) => {
                const distanceFromFront = getDistanceFromFront(cardIndex)
                const isActive = distanceFromFront === 0

                return (
                    <motion.div
                        key={`card-${cardIndex}`}
                        className="absolute inset-x-0 top-0 cursor-pointer"
                        style={{
                            width: typeof width === "number" ? `${width}px` : width,
                            height: typeof height === "number" ? `${height}px` : height,
                            transformOrigin: "center top",
                        }}
                        animate={{
                            y: stackOffset * distanceFromFront,
                            scale: 1 - scaleStep * distanceFromFront,
                            zIndex: cardCount - distanceFromFront,
                            opacity: 1 - distanceFromFront * 0.12,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                            mass: 0.5,
                        }}
                        onClick={() => !isActive && setActiveIndex(cardIndex)}
                        whileHover={isActive ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
                        whileTap={isActive ? { scale: 0.98 } : undefined}
                    >
                        {child}
                    </motion.div>
                )
            })}
        </div>
    )
}

interface CardStackItemProps {
    children: ReactNode
    className?: string
}

export function CardStackItem({ children, className = "" }: Readonly<CardStackItemProps>) {
    return (
        <div className={`h-full w-full overflow-hidden ${className}`}>
            {children}
        </div>
    )
}
