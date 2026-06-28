import { Link } from "react-router-dom"
import { AtSign, Globe, Share2, MessageCircle, MapPin, Phone, Mail } from "lucide-react"

const columns = [
  {
    title: "Our Masalas",
    links: [
      "Sambar Masala",
      "Rasam Powder",
      "Chicken Masala",
      "Mutton Masala",
      "Biryani Masala",
      "Combo Packs",
    ],
  },
  {
    title: "Mom's Magic",
    links: [
      "About Us",
      "Our Story",
      "Why Choose Us",
      "Customer Reviews",
      "Recipes",
    ],
  },
  {
    title: "Customer Care",
    links: [
      "Help Center",
      "Track Order",
      "Shipping Policy",
      "Return Policy",
      "Contact Us",
    ],
  },
  {
    title: "More",
    links: [
      "Special Offers",
      "Wholesale Orders",
      "Become a Partner",
      "FAQs",
      "Privacy Policy",
    ],
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
                SK
              </span>
              <span className="font-serif text-2xl font-bold text-primary">
                Mom's Magic Masala
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium fresh meat, delivered daily. Hygienically cut, never
              frozen, always fresh to your door.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Phone size={16} className="text-primary" /> +91 63825 93232
              </span>
              <span className="flex items-center gap-2">
                <Mail size={16} className="text-primary" /> momsmagicmasalaofficial@gmail.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" /> Tiruppur, Tamil Nadu, India - 641 687.
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
            © {new Date().getFullYear()} BPY CREATIONS. All rights reserved.
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
