import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { CARDS, SENDER } from "../data/messages";
import type { Card } from "../data/messages";
import { sfx } from "../lib/sound";
import { Leaf, Pumpkin, Wreath, BrandRow } from "./Art";
gsap.registerPlugin(ScrollTrigger);

function GreetingCard({ c }: { c: Card }) {
  return (
    <article
      onMouseEnter={() => sfx.click()}
      className={`card-item paper relative rounded-md shadow-card overflow-hidden hover:-translate-y-1 transition will-change-transform ${c.featured ? "md:col-span-2 lg:col-span-3" : ""}`}
    >
      {/* corner art, as on the printed card */}
      <Leaf tone="mustard" className="absolute w-9 -top-1 left-6 rotate-[-20deg]" />
      <Leaf tone="slate" className="absolute w-10 top-2 left-12 rotate-[25deg]" />
      <Leaf tone="slate" className="absolute w-6 top-8 left-3 rotate-[60deg]" />

      <div className={`relative px-6 sm:px-8 pt-14 pb-24 ${c.featured ? "lg:pr-72" : ""}`}>
        <div className="flex items-end gap-3">
          <span className="font-serif italic text-2xl text-ink">Dear</span>
          <span className="flex-1 border-b border-line font-serif italic text-xl text-ink pb-0.5 truncate">{c.name}</span>
        </div>
        <p className={`ruled font-serif italic text-ink/85 mt-4 ${c.featured ? "text-[15px] md:text-base" : "text-[13px]"}`}>{c.message}</p>
        <div className="flex items-end gap-3 mt-6 sm:w-2/3 sm:ml-auto">
          <span className="font-serif italic text-2xl text-ink">From</span>
          <span className="flex-1 border-b border-line font-serif italic text-lg text-ink pb-0.5">{SENDER}</span>
        </div>
      </div>

      {c.featured && (
        <Wreath className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-56">
          <span className="font-block tracking-[0.35em] text-ink text-lg">2026</span>
        </Wreath>
      )}
      <Pumpkin tone="blue" className="absolute w-16 bottom-6 left-3" />
      <Pumpkin tone="orange" className="absolute w-14 bottom-8 left-14" />
      <Pumpkin tone="cream" className="absolute w-10 bottom-4 left-[88px]" />
      <div className="absolute bottom-3 left-[150px] right-5"><BrandRow /></div>
    </article>
  );
}

export default function GreetingWall() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".card-item").forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, rotate: -1.5, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" } });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="wall" ref={root} className="cream-burst relative py-24 px-5">
      <div className="text-center mb-14">
        <span className="inline-block bg-tomato text-butter font-block tracking-[0.3em] text-sm px-5 py-1"
          style={{ clipPath: "polygon(0 0,100% 0,96% 50%,100% 100%,0 100%,4% 50%)" }}>WELCOME</span>
        <h2 className="font-script text-cocoa text-5xl md:text-6xl mt-3">A Note For You</h2>
        <p className="text-cocoa/75 mt-3 max-w-md mx-auto text-sm">Twelve cards, twelve honest thank-yous.</p>
      </div>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => <GreetingCard key={c.name} c={c} />)}
      </div>
    </section>
  );
}
