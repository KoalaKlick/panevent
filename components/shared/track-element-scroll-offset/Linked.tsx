"use client"

import {
    motion,
    useScroll,
} from "motion/react"
import { useRef } from "react"
import { useScrollOverflowMask } from "./useScrollOverflowMask"
import { StyleSheet } from "./Style"

export default function ScrollLinked() {
    const ref = useRef(null)
    const { scrollXProgress } = useScroll({ container: ref })
    const maskImage = useScrollOverflowMask(scrollXProgress)

    return (
        <div id="track-scroll0offset" >
            <svg id="progress" width="80" height="80" viewBox="0 0 100 100">
                <title>Scroll Progress Indicator</title>
                <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    className="indicator"
                    style={{ pathLength: scrollXProgress }}
                />
            </svg>
            <motion.ul ref={ref} style={{ maskImage }}>
                <li style={{ background: "#ff0088" }}></li>
                <li style={{ background: "#dd00ee" }}></li>
                <li style={{ background: "#9911ff" }}></li>
                <li style={{ background: "#0d63f8" }}></li>
                <li style={{ background: "#0cdcf7" }}></li>
                <li style={{ background: "#8df0cc" }}></li>
            </motion.ul>
            <StyleSheet />
        </div>
    )
}



/**
 * ==============   Styles   ================
 */


