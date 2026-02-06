"use client"

import { type ElementType, useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

interface ScrambleTextProps {
    text: string
    className?: string
    /** Characters to use for scrambling effect */
    characters?: string
    /** Array of colors for each character (cycles if shorter than text) */
    colors?: string[]
    /** Duration of the scramble animation in ms */
    duration?: number
    /** Delay before animation starts in ms */
    delay?: number
    /** How fast characters scramble (lower = faster) */
    scrambleSpeed?: number
    /** Trigger animation only once on first view */
    once?: boolean
    /** Custom tag to render */
    as?: ElementType
}

export function ScrambleText({
    text,
    className = "",
    characters = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789",
    colors,
    duration = 1500,
    delay = 0,
    scrambleSpeed = 100,
    once = true,
    as: Component = "span",
}: Readonly<ScrambleTextProps>) {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once, margin: "-10%" })
    const [displayText, setDisplayText] = useState(text)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (!isInView || (once && hasAnimated)) return

        const startTime = Date.now()
        const textLength = text.length

        // Start with fully scrambled text
        setDisplayText(
            text
                .split("")
                .map((char) =>
                    char === " " ? " " : characters[Math.floor(Math.random() * characters.length)]
                )
                .join("")
        )

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime - delay

            if (elapsed < 0) {
                // Still in delay period, show scrambled
                setDisplayText(
                    text
                        .split("")
                        .map((char) =>
                            char === " " ? " " : characters[Math.floor(Math.random() * characters.length)]
                        )
                        .join("")
                )
                return
            }

            const progress = Math.min(elapsed / duration, 1)
            const revealedCount = Math.floor(progress * textLength)

            const newText = text
                .split("")
                .map((char, index) => {
                    if (char === " ") return " "
                    if (index < revealedCount) return char
                    return characters[Math.floor(Math.random() * characters.length)]
                })
                .join("")

            setDisplayText(newText)

            if (progress >= 1) {
                clearInterval(interval)
                setDisplayText(text)
                setHasAnimated(true)
            }
        }, scrambleSpeed)

        return () => clearInterval(interval)
    }, [isInView, text, characters, duration, delay, scrambleSpeed, once, hasAnimated])

    // If colors are provided, render each character in a span with its color
    if (colors && colors.length > 0) {
        return (
            <Component ref={ref} className={className}>
                {displayText.split("").map((char, index) => (
                    <span
                        key={`${index}-${char}`}
                        style={{ color: colors[index % colors.length] }}
                    >
                        {char}
                    </span>
                ))}
            </Component>
        )
    }

    return (
        <Component ref={ref} className={className}>
            {displayText}
        </Component>
    )
}
