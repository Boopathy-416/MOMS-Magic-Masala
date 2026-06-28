import { Helmet } from "react-helmet-async";
import Hero from "../components/home/Hero.jsx";
import Categories from "../components/home/Categories.jsx";
import BestSellers from "../components/home/BestSellers.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import DeliveryProcess from "../components/home/DeliveryProcess.jsx";
import Features from "../components/home/Features.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
import Newsletter from "../components/home/Newsletter.jsx";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Moms Magic Masala",
  description:
    "Authentic homemade masalas — handcrafted spice blends, rich flavors and convenient home delivery.",
  servesCuisine: "Premium homemade masala ",
  priceRange: "₹₹",
  address: {
    "@type": "641687",
    addressLocality: "Tirupur",
    addressCountry: "IN",
  },
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          Moms Magic Masala — Traditional Homemade Masalas Delivered Fresh
        </title>
        <meta
          name="description"
          content="Order premium farm-fresh chicken, mutton, fish, seafood, eggs and marinated meats online. Hygienically cut, temperature controlled, fast delivery across India."
        />
        <meta
          property="og:title"
          content="Moms Magic Masala — Traditional Homemade Masalas Delivered Fresh"
        />
        <meta
          property="og:description"
          content="Handcrafted homemade masalas with authentic flavors. Freshly prepared and delivered to your door."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.momsmagicmasala.store/" />
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
  );
}
