interface ProgressBarProps {
  value: number
  className?: string
}

export function ProgressBar({ value, className = "" }: ProgressBarProps) {
  return (
    <div className={`w-full bg-muted rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  )
}
