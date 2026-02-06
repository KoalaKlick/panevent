export function StyleSheet() {
    return (
        <style>{`
            #track-scroll0offset {
              width: 100vw;
              max-width: 400px;
              position: relative;
            }

            #track-scroll0offset #progress {
                position: absolute;
                top: -65px;
                left: -15px;
                transform: rotate(-90deg);
            }

            #track-scroll0offset .bg {
                stroke: #0b1011;
            }

            #track-scroll0offset #progress circle {
                stroke-dashoffset: 0;
                stroke-width: 10%;
                fill: none;
            }

            #progress .indicator {
                stroke: var(--accent);
            }

            #track-scroll0offset ul {
                display: flex;
                list-style: none;
                height: 220px;
                overflow-x: scroll;
                padding: 20px 0;
                flex: 0 0 600px;
                margin: 0 auto;
                gap: 20px;
            }

            #track-scroll0offset ::-webkit-scrollbar {
                height: 5px;
                width: 5px;
                background: #fff3;
                -webkit-border-radius: 1ex;
            }

            #track-scroll0offset ::-webkit-scrollbar-thumb {
                background: var(--accent);
                -webkit-border-radius: 1ex;
            }

            #track-scroll0offset ::-webkit-scrollbar-corner {
                background: #fff3;
            }

            #track-scroll0offset li {
                flex: 0 0 200px;
                background: var(--accent);
            }

    `}</style>
    )
}