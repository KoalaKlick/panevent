// components/SuccessIllustration.tsx
'use client'

import { motion } from 'motion/react'
export function PasswordSuccessSVG({ className = "w-48 h-48" }: { readonly className?: string }) {
    return (
        <motion.div
            className={className}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Password Reset Successful</title>

                <defs>
                    {/* Gradient definitions */}
                    <linearGradient id="panAfrican" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#EF4444" />
                        <stop offset="50%" stopColor="#FACC15" />
                        <stop offset="100%" stopColor="#16A34A" />
                    </linearGradient>

                    <linearGradient id="shieldGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22C55E" />
                        <stop offset="100%" stopColor="#16A34A" />
                    </linearGradient>

                    {/* Shadow filter */}
                    <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
                        <feOffset dx="0" dy="4" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.15" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background circle with subtle gradient */}
                <motion.circle
                    cx="200"
                    cy="200"
                    r="160"
                    fill="url(#panAfrican)"
                    opacity="0.08"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Decorative rings */}
                <motion.circle
                    cx="200"
                    cy="200"
                    r="140"
                    fill="none"
                    stroke="url(#panAfrican)"
                    strokeWidth="2"
                    opacity="0.2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />

                <motion.circle
                    cx="200"
                    cy="200"
                    r="120"
                    fill="none"
                    stroke="url(#panAfrican)"
                    strokeWidth="2"
                    opacity="0.15"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.15 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />

                {/* Main shield */}
                <motion.g
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                    }}
                >
                    {/* Shield shadow */}
                    <path
                        d="M200 100 L260 125 L260 200 C260 245 235 275 200 300 C165 275 140 245 140 200 L140 125 Z"
                        fill="#000000"
                        opacity="0.1"
                        transform="translate(0, 8)"
                    />

                    {/* Shield main */}
                    <path
                        d="M200 100 L260 125 L260 200 C260 245 235 275 200 300 C165 275 140 245 140 200 L140 125 Z"
                        fill="url(#shieldGreen)"
                        filter="url(#softShadow)"
                    />

                    {/* Shield highlight */}
                    <path
                        d="M200 110 L250 132 L250 195 C250 235 230 260 200 282 C170 260 150 235 150 195 L150 132 Z"
                        fill="#FFFFFF"
                        opacity="0.1"
                    />
                </motion.g>

                {/* Checkmark */}
                <motion.path
                    d="M170 200 L190 220 L235 170"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.9,
                        ease: "easeOut"
                    }}
                />

                {/* Success particles */}
                {[
                    { x: 120, y: 120, delay: 1.3, scale: 1 },
                    { x: 280, y: 120, delay: 1.4, scale: 0.8 },
                    { x: 120, y: 280, delay: 1.5, scale: 0.9 },
                    { x: 280, y: 280, delay: 1.6, scale: 1.1 },
                    { x: 200, y: 80, delay: 1.35, scale: 0.7 },
                    { x: 320, y: 200, delay: 1.45, scale: 0.85 },
                ].map((particle) => (
                    <motion.g key={`${particle.x}-${particle.y}`}>
                        {/* Star shape */}
                        <motion.path
                            d={`M ${particle.x} ${particle.y - 6 * particle.scale} L ${particle.x + 2 * particle.scale} ${particle.y - 2 * particle.scale} L ${particle.x + 6 * particle.scale} ${particle.y} L ${particle.x + 2 * particle.scale} ${particle.y + 2 * particle.scale} L ${particle.x} ${particle.y + 6 * particle.scale} L ${particle.x - 2 * particle.scale} ${particle.y + 2 * particle.scale} L ${particle.x - 6 * particle.scale} ${particle.y} L ${particle.x - 2 * particle.scale} ${particle.y - 2 * particle.scale} Z`}
                            fill="#FACC15"
                            initial={{ scale: 0, rotate: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1, 0],
                                rotate: [0, 180],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 1,
                                delay: particle.delay,
                                ease: "easeOut",
                            }}
                        />
                    </motion.g>
                ))}
            </svg>
        </motion.div>
    )
}