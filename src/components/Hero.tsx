import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { sfx } from "../lib/sound";
import { Bunting, Turkey, Pumpkin, Leaf } from "./Art";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { y: 50, opacity: 0, duration: 0.9, stagger: 0.14, ease: "power3.out" });
      gsap.from(".hero-turkey", { y: 80, opacity: 0, scale: 0.8, duration: 1.1, delay: 0.5, ease: "back.out(1.6)" });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="sunburst relative min-h-screen flex flex-col items-center text-center px-6 pt-20 pb-0 overflow-hidden">
      <Bunting className="absolute top-0 left-0 w-full h-16 sm:h-20 sway" />
      <Leaf tone="orange" className="absolute w-6 left-[8%] top-[28%] rotate-12 opacity-90" />
      <Leaf tone="green" className="absolute w-6 right-[10%] top-[34%] -rotate-12 opacity-90" />
      <Leaf tone="red" className="absolute w-5 left-[18%] top-[55%] rotate-45 opacity-90" />

      <span className="hero-line bg-tomato text-butter font-block tracking-[0.3em] text-sm md:text-base px-5 py-1 shadow-card"
        style={{ clipPath: "polygon(0 0,100% 0,96% 50%,100% 100%,0 100%,4% 50%)" }}>HAPPY</span>
      <h1 className="hero-line font-script text-cocoa text-6xl sm:text-7xl md:text-8xl mt-3 leading-none">Thanksgiving</h1>
      <p className="hero-line mt-5 max-w-md text-cocoa/85 text-sm md:text-base">
        For the people who light up ordinary days — a little corner of autumn, with a note from me to each of you.
      </p>
      <a href="#wall" onClick={() => sfx.click()}
        className="hero-line mt-7 inline-flex items-center gap-2 bg-cocoa hover:bg-cocoa2 transition text-butter px-8 py-3 rounded-full font-block tracking-widest text-sm shadow-panel">
        OPEN YOUR CARD ↓
      </a>

      <div className="hero-turkey relative mt-auto w-full max-w-sm">
        <Turkey className="floaty w-64 sm:w-72 mx-auto relative z-10 -mb-10" />
        <Pumpkin tone="orange" className="w-full max-w-md mx-auto" style={{ transform: "scaleY(.8)", transformOrigin: "bottom" }} />
      </div>
    </section>
  );
}
