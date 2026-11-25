import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Sunflower, Pumpkin, Leaf } from "./Art";
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
    <section ref={ref} className="sunburst-dark relative py-28 px-6 text-center overflow-hidden">
      <Pumpkin tone="orange" className="absolute -top-4 -left-6 w-36 md:w-52 rotate-[-8deg]" />
      <Sunflower className="absolute top-3 right-[18%] w-20 md:w-28" />
      <Sunflower className="absolute top-16 right-[6%] w-14 md:w-20" />
      <Leaf tone="green" className="absolute w-5 left-[22%] top-[45%] rotate-45" />
      <Leaf tone="orange" className="absolute w-5 right-[24%] bottom-[22%] -rotate-12" />
      <Pumpkin tone="mustard" className="absolute -bottom-3 -right-4 w-32 md:w-44" />

      <div className="relative max-w-2xl mx-auto">
        <p className="intro-line font-script text-butter text-5xl md:text-6xl">It's time to</p>
        <p className="intro-line font-block text-tomato text-6xl md:text-8xl tracking-wide leading-none mt-1">GIVE THANKS</p>
        <p className="intro-line mt-8 text-butter/85 md:text-lg max-w-lg mx-auto">
          Thanksgiving is a quiet invitation to pause, look around, and say thank you — to the helpers, the teachers, the bright ones.
        </p>
      </div>
    </section>
  );
}
