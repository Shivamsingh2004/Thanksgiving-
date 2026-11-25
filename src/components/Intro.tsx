import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".intro-line", { y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section ref={ref} className="relative py-24 px-6 max-w-3xl mx-auto text-center">
      <p className="intro-line font-display text-2xl md:text-4xl text-brown/90 leading-snug">
        Thanksgiving is a quiet invitation to pause, look around, and say <span className="text-burnt">thank you</span>.
      </p>
      <p className="intro-line mt-6 text-brown/70 md:text-lg">
        Here's to the people who make the year softer — the helpers, the teachers, the bright ones.
      </p>
    </section>
  );
}
