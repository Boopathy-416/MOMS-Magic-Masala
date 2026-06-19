import { useState } from "react"
import { Mail, CheckCircle2 } from "lucide-react"
import Reveal from "../Reveal.jsx"
import Button from "../ui/Button.jsx"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.includes("@")) return
    setDone(true)
    setEmail("")
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
      <Reveal className="overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 lg:py-16">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
          <Mail size={26} />
        </span>
        <h2 className="mt-5 text-balance font-serif text-3xl font-bold sm:text-4xl">
          Get ₹100 off your first order
        </h2>
        <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
          Subscribe for fresh deals, recipes and exclusive drops delivered to
          your inbox.
        </p>

        {done ? (
          <p className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-5 py-3 font-semibold">
            <CheckCircle2 size={20} className="text-accent" />
            You&apos;re subscribed! Check your inbox.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-13 flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 text-primary-foreground placeholder:text-primary-foreground/60 outline-none focus:border-accent"
            />
            <Button type="submit" variant="accent" size="lg">
              Subscribe
            </Button>
          </form>
        )}
      </Reveal>
    </section>
  )
}
