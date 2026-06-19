import { Component } from "react"

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error) {
    console.log("[v0] ErrorBoundary caught:", error?.message)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="font-serif text-2xl font-bold text-primary">
            Something went wrong
          </h1>
          <p className="max-w-md text-muted-foreground">
            We hit a snag while loading this page. Please refresh to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
