const DashedBorder = ({
    children,
    dashArray = "5 5",
    borderRadius = 16,
    className = ""
}: {
    children: React.ReactNode;
    dashArray?: string;
    borderRadius?: number;
    className?: string;
}) => (
    <div className={`relative rounded-2xl ${className}`}>
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
        >
            <title>Dashed Border</title>
            <rect
                x="0.5"
                y="0.5"
                width="calc(100% - 1px)"
                height="calc(100% - 1px)"
                rx={borderRadius}
                ry={borderRadius}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray={dashArray}
                className="text-gray-300"
            />
        </svg>
        {children}
    </div>
);

export default DashedBorder;