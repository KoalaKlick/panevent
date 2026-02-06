"use client"

import { motion, type MotionValue } from "motion/react"
import { EventGalleryItem } from "./EventGalleryItem"
import type { EventItem } from "@/lib/const/landing"

interface EventGalleryProps {
    readonly items: EventItem[]
    readonly x: MotionValue<string>
    readonly scrollProgress: MotionValue<number>
    readonly containerRef: React.RefObject<HTMLDivElement | null>
}

// Height per item in vh units for scroll calculation
const VH_PER_ITEM = 60
const VH_PER_ITEM_MOBILE = 40

export function EventGallery({ items, x, scrollProgress, containerRef }: EventGalleryProps) {
    // Dynamic scroll height based on item count
    const scrollHeight = items.length * VH_PER_ITEM
    const scrollHeightMobile = items.length * VH_PER_ITEM_MOBILE

    return (
        <div
            ref={containerRef}
            className="relative motion-reduce:h-auto"
            style={{
                height: `max(100vh, ${scrollHeight}vh)`,
            }}
        >
            {/* Scroll Progress Indicator - Polygon with sides = items count */}
            <div className="sticky top-[calc(90svh)] left-[200svh]  w-fit">
                <svg
                    width="60"
                    height="60"
                    viewBox="0 0 100 100"
                    className="-rotate-90"
                >
                    <title>Scroll Progress Indicator</title>
                    {(() => {
                        const sides = items.length
                        const cx = 50
                        const cy = 50
                        const r = 30
                        // Generate polygon points and create a closed path
                        const points = Array.from({ length: sides }, (_, i) => {
                            const angle = (2 * Math.PI * i) / sides - Math.PI / 2
                            return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
                        })
                        const pathD = points.map((p, i) =>
                            `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`
                        ).join(' ') + ' Z'

                        return (
                            <>
                                <path
                                    d={pathD}
                                    className="fill-none stroke-[#1a1a1a] stroke-[3]"
                                    strokeLinejoin="round"
                                />
                                <motion.path
                                    d={pathD}
                                    className="fill-none stroke-[var(--accent,#ff0088)] stroke-[3]"
                                    strokeLinejoin="round"
                                    pathLength="1"
                                    style={{
                                        pathLength: scrollProgress,
                                    }}
                                />
                            </>
                        )
                    })()}
                </svg>
            </div>

            <div className="sticky top-0 mx-auto flex h-screen w-[400px] items-center justify-start overflow-visible max-sm:w-[280px] motion-reduce:relative motion-reduce:h-auto motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:py-12">
                <motion.div
                    className="flex gap-[30px] will-change-transform max-sm:gap-[15px] motion-reduce:!transform-none"
                    style={{
                        x,
                        // Total width = (itemWidth + gap) * (items - 1) for proper 0-100% mapping
                        width: `calc((400px + 30px) * ${items.length - 1} )`,
                    }}
                >
                    {items.map((item) => (
                        <EventGalleryItem key={item.id} item={item} />
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
