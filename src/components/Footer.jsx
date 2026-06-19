import { Link } from "react-router-dom"
import { AtSign, Globe, Share2, MessageCircle, MapPin, Phone, Mail } from "lucide-react"

const columns = [
  {
    title: "Shop",
    links: ["Chicken", "Mutton", "Fish & Seafood", "Eggs", "Marinated", "Combos"],
  },
  {
    title: "Company",
    links: ["About Us", "Our Story", "Careers", "Press", "Blog"],
  },
  {
    title: "Support",
    links: ["Help Center", "Track Order", "Returns", "Delivery Info", "Contact"],
  },
  {
    title: "Quick Links",
    links: ["Offers", "Gift Cards", "Bulk Orders", "Franchise", "Sitemap"],
  },
]

const socials = [
  { icon: AtSign, label: "Instagram" },
  { icon: Globe, label: "Facebook" },
  { icon: MessageCircle, label: "Twitter" },
  { icon: Share2, label: "YouTube" },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-serif text-xl font-bold text-primary-foreground">
                Q
              </span>
              <span className="font-serif text-2xl font-bold text-primary">
                Qasai
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium fresh meat, delivered daily. Hygienically cut, never
              frozen, always fresh to your door.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Phone size={16} className="text-primary" /> +91 00000 00000
              </span>
              <span className="flex items-center gap-2">
                <Mail size={16} className="text-primary" /> hello@qasai.in
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" /> Bengaluru, India
              </span>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-serif text-base font-bold">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      to="/"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Qasai. All rights reserved.
          </p>
          <div className="flex gap-2">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href="/"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
