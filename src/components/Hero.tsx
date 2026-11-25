import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { sfx } from "../lib/sound";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { y: 60, opacity: 0, duration: 1, stagger: 0.16, ease: "power3.out" });
      gsap.from(".hero-pumpkin", { y: 30, opacity: 0, scale: 0.7, duration: 1.2, delay: 0.6, ease: "back.out(1.7)" });
      gsap.to(".hero-pumpkin", { y: -12, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.8 });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,#FFE0A8_0%,transparent_60%)]" />
      <span className="hero-line uppercase tracking-[0.45em] text-burnt text-xs md:text-sm">Happy Thanksgiving</span>
      <h1 className="hero-line font-display text-5xl md:text-7xl lg:text-8xl font-black text-brown mt-5 max-w-4xl leading-[1.05]">
        A Season of <span className="text-burnt">Gratitude</span>
      </h1>
      <p className="hero-line mt-6 max-w-xl text-brown/80 text-base md:text-lg">
        For the people who light up ordinary days — this little corner of autumn is for you.
      </p>
      <div className="hero-pumpkin text-7xl md:text-8xl mt-10">🎃</div>
      <a href="#wall" onClick={() => sfx.click()} className="hero-line mt-10 inline-flex items-center gap-2 bg-burnt hover:bg-ember transition text-cream px-7 py-3 rounded-full font-semibold shadow-soft">
        Enter the Celebration →
      </a>
    </section>
  );
}
