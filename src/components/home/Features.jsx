import { motion } from "framer-motion";
import { Sun, ChefHat, Thermometer, CreditCard, Rocket } from "lucide-react";
import Reveal from "../Reveal.jsx";

const features = [
  {
    icon: Sun,
    title: "Freshly Prepared",
    desc: "Handcrafted daily in small batches for maximum freshness.",
  },
  {
    icon: ChefHat,
    title: "Traditional Recipes",
    desc: "Prepared with authentic family recipes and premium spices.",
  },
  {
    icon: Thermometer,
    title: "Quality Ingredients",
    desc: "Made using carefully selected spices with no artificial preservatives.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    desc: "Safe and encrypted checkout with multiple payment options.",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    desc: "Fresh homemade masalas delivered quickly to your doorstep.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">
            Built on trust
          </p>
          <h2 className="mt-2 text-balance font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Homemade Taste You Can Trust
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            Every pack is handcrafted with premium spices, traditional recipes,
            and hygienic preparation to bring authentic homemade flavors to your
            kitchen. Freshly prepared, carefully packed, and delivered with
            care.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={
                  "flex gap-4 rounded-3xl border border-border bg-card p-5" +
                  (i === 4 ? " sm:col-span-2" : "")
                }
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground">
                  <Icon size={24} className="text-primary" />
                </span>
                <div>
                  <h3 className="font-serif text-base font-bold">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
