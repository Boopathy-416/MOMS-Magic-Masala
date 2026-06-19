import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { Star, Quote } from "lucide-react"
import "swiper/css"
import "swiper/css/pagination"
import { testimonials } from "../../data/product.js"
import Reveal from "../Reveal.jsx"

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">
          Loved by thousands
        </p>
        <h2 className="mt-2 text-balance font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          What our customers say
        </h2>
      </Reveal>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        grabCursor
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-12"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id} className="h-auto">
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6">
              <Quote size={32} className="text-accent" />
              <p className="mt-3 flex-1 leading-relaxed text-foreground">
                “{t.text}”
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-serif text-lg font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < t.rating
                          ? "fill-accent text-accent"
                          : "text-border"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
