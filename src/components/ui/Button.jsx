import { cn } from "../../lib/utils.js"

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-[#681919] shadow-sm shadow-primary/20",
  accent:
    "bg-accent text-accent-foreground hover:brightness-105 shadow-sm shadow-accent/30",
  outline:
    "border border-primary/30 text-primary bg-transparent hover:bg-primary/5",
  ghost: "text-foreground hover:bg-muted",
  light: "bg-card text-foreground hover:bg-muted border border-border",
}

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
  icon: "h-10 w-10",
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
