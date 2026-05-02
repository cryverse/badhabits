"use client";

import { theme } from "../styles/theme";

export default function ProgressRing({
  progress = 0, // 0 - 100
  size = 64,
  stroke = 6,
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <div style={{ width: size, height: size }}>
      <svg width={size} height={size}>

        {/* BACK CIRCLE */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
          fill="none"
        />

        {/* PROGRESS CIRCLE */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.accent.main}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "stroke-dashoffset 350ms ease",
          }}
        />

      </svg>
    </div>
  );
}