import { Outlet } from "react-router-dom"
import Announcement from "./Announcement.jsx"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import MobileNav from "./MobileNav.jsx"
import CartDrawer from "./CartDrawer.jsx"
import FloatingUtilities from "./FloatingUtilities.jsx"
import CookieConsent from "./CookieConsent.jsx"

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Announcement />
      <Header />
      <main className="flex-1 pb-24 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <CartDrawer />
      <FloatingUtilities />
      <CookieConsent />
    </div>
  )
}
