"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HeatMapProps {
  data: number[][]
  xLabels: string[]
  yLabels: string[]
  children?: React.ReactNode
  className?: string
}

interface HeatMapContextValue {
  data: number[][]
  xLabels: string[]
  yLabels: string[]
  minValue: number
  maxValue: number
}

const HeatMapContext = React.createContext<HeatMapContextValue | undefined>(undefined)

export function HeatMap({ data, xLabels, yLabels, children, className }: HeatMapProps) {
  const minValue = Math.min(...data.flat())
  const maxValue = Math.max(...data.flat())

  return (
    <HeatMapContext.Provider value={{ data, xLabels, yLabels, minValue, maxValue }}>
      <div className={cn("overflow-auto", className)}>{children}</div>
    </HeatMapContext.Provider>
  )
}

export function HeatMapGrid({ className }: { className?: string }) {
  const context = React.useContext(HeatMapContext)

  if (!context) {
    throw new Error("HeatMapGrid must be used within a HeatMap")
  }

  const { data, xLabels, yLabels, minValue, maxValue } = context

  const getColor = (value: number) => {
    // Normalize value between 0 and 1
    const normalized = (value - minValue) / (maxValue - minValue)

    // Green gradient from light to dark
    const r = Math.round(255 - normalized * 200)
    const g = Math.round(255 - normalized * 100)
    const b = Math.round(255 - normalized * 200)

    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <div className={cn("relative", className)}>
      <div className="grid" style={{ gridTemplateColumns: `auto repeat(${xLabels.length}, 1fr)` }}>
        {/* Empty cell for top-left corner */}
        <div className="p-2 font-medium text-sm text-right"></div>

        {/* X-axis labels */}
        {xLabels.map((label, index) => (
          <div key={index} className="p-2 font-medium text-sm text-center">
            {label}
          </div>
        ))}

        {/* Y-axis labels and data cells */}
        {yLabels.map((yLabel, yIndex) => (
          <React.Fragment key={yIndex}>
            {/* Y-axis label */}
            <div className="p-2 font-medium text-sm text-right whitespace-nowrap">{yLabel}</div>

            {/* Data cells */}
            {data[yIndex].map((value, xIndex) => (
              <div
                key={xIndex}
                className="p-2 text-center text-sm font-medium transition-colors"
                style={{
                  backgroundColor: getColor(value),
                  color: value > (minValue + maxValue) / 2 ? "white" : "black",
                }}
              >
                {value}%
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export function HeatMapLegend({ title }: { title: string }) {
  const context = React.useContext(HeatMapContext)

  if (!context) {
    throw new Error("HeatMapLegend must be used within a HeatMap")
  }

  const { minValue, maxValue } = context

  return (
    <div className="flex items-center justify-end mt-4 space-x-2">
      <span className="text-xs text-muted-foreground">{title}:</span>
      <div className="flex items-center">
        <div className="w-4 h-4" style={{ backgroundColor: "rgb(255, 255, 255)" }}></div>
        <span className="text-xs mx-1">{Math.round(minValue)}%</span>
      </div>
      <div className="w-24 h-4 bg-gradient-to-r from-[rgb(255,255,255)] to-[rgb(55,155,55)]"></div>
      <div className="flex items-center">
        <div className="w-4 h-4" style={{ backgroundColor: "rgb(55, 155, 55)" }}></div>
        <span className="text-xs mx-1">{Math.round(maxValue)}%</span>
      </div>
    </div>
  )
}
