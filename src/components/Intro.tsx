import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Sunflower, Pumpkin } from "./Art";
gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".intro-line", { y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section ref={ref} className="relative py-28 px-5">
      <div className="relative max-w-2xl mx-auto glass-dark rounded-[32px] px-6 py-14 text-center">
        <Sunflower className="absolute -top-8 -left-6 w-24 md:w-32" />
        <Sunflower className="absolute -top-6 -right-5 w-20 md:w-28" />
        <Pumpkin tone="orange" className="absolute -bottom-8 -left-4 w-28 md:w-36" />
        <Pumpkin tone="mustard" className="absolute -bottom-6 -right-4 w-24 md:w-32" />
        <p className="intro-line font-script text-butter text-5xl md:text-6xl">It's time to</p>
        <p className="intro-line font-block text-tomato text-6xl md:text-8xl tracking-wide leading-none mt-1">GIVE THANKS</p>
        <p className="intro-line mt-8 text-butter/90 md:text-lg max-w-lg mx-auto">
          Thanksgiving is a quiet invitation to pause, look around, and say thank you.
        </p>
      </div>
    </section>
  );
}
