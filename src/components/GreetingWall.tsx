import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { CARDS } from "../data/messages";
import { sfx } from "../lib/sound";
gsap.registerPlugin(ScrollTrigger);

export default function GreetingWall() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".card-item").forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="wall" ref={root} className="relative py-20 px-6 max-w-6xl mx-auto">
      <h2 className="font-display text-4xl md:text-5xl text-center text-burnt mb-4">A Note For You</h2>
      <p className="text-center text-brown/70 mb-12 max-w-lg mx-auto">Twelve people, twelve honest thank-yous.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <article
            key={c.name}
            onMouseEnter={() => sfx.click()}
            className={`card-item relative bg-white/85 backdrop-blur rounded-2xl p-6 shadow-soft border border-gold/30 hover:-translate-y-1 hover:border-burnt/40 transition will-change-transform ${c.featured ? "sm:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#FFF1D6] to-[#FFE0B8] border-burnt/40" : ""}`}
          >
            <h3 className={`font-display ${c.featured ? "text-3xl md:text-4xl" : "text-xl"} text-brown`}>{c.name}</h3>
            <p className={`mt-3 ${c.featured ? "text-base md:text-lg leading-relaxed" : "text-sm"} text-brown/80`}>{c.message}</p>
            <span className="absolute -top-3 -right-3 text-2xl">🍁</span>
          </article>
        ))}
      </div>
    </section>
  );
}
