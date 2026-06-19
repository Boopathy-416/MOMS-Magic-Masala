import { Helmet } from "react-helmet-async"
import Hero from "../components/home/Hero.jsx"
import Categories from "../components/home/Categories.jsx"
import BestSellers from "../components/home/BestSellers.jsx"
import WhyChooseUs from "../components/home/WhyChooseUs.jsx"
import DeliveryProcess from "../components/home/DeliveryProcess.jsx"
import Features from "../components/home/Features.jsx"
import Testimonials from "../components/home/Testimonials.jsx"
import Newsletter from "../components/home/Newsletter.jsx"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Qasai",
  description:
    "Premium fresh meat delivery — chicken, mutton, fish, seafood, eggs and marinated cuts.",
  servesCuisine: "Fresh Meat",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Qasai — Premium Fresh Meat Delivered Daily</title>
        <meta
          name="description"
          content="Order premium farm-fresh chicken, mutton, fish, seafood, eggs and marinated meats online. Hygienically cut, temperature controlled, fast delivery across India."
        />
        <meta property="og:title" content="Qasai — Premium Fresh Meat Delivered Daily" />
        <meta
          property="og:description"
          content="Hygienically cut, never frozen, always fresh. Delivered to your door."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://qasai.in/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Hero />
      <Categories />
      <BestSellers />
      <WhyChooseUs />
      <DeliveryProcess />
      <Features />
      <Testimonials />
      <Newsletter />
    </>
  )
}
