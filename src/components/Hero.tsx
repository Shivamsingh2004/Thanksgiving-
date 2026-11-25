import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { sfx } from "../lib/sound";
import { Bunting, TurkeyUmbrella, Pumpkin, SunflowerStem, Sunflower, Grapes, Apple, Leaf } from "./Art";

/** Hero = story panel #3: "Welcome Thanksgiving", turkey with umbrella, sunflowers, pumpkin, grapes. */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { y: 50, opacity: 0, duration: 0.9, stagger: 0.14, ease: "power3.out" });
      gsap.from(".hero-turkey", { y: 80, opacity: 0, duration: 1.1, delay: 0.5, ease: "back.out(1.5)" });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="cream-burst relative min-h-screen flex flex-col items-center text-center px-6 pt-16 overflow-hidden">
      <Bunting className="absolute top-0 left-0 w-full h-14 sway" />
      {/* soft clouds */}
      <div className="absolute top-[30%] left-0 w-40 h-12 rounded-full bg-white/70 blur-[2px]" />
      <div className="absolute top-[38%] right-0 w-48 h-14 rounded-full bg-white/70 blur-[2px]" />
      <Leaf tone="green" className="absolute w-5 left-[14%] top-[24%] rotate-12" />
      <Leaf tone="orange" className="absolute w-5 right-[16%] top-[30%] -rotate-12" />

      <div className="relative z-10 glass rounded-3xl px-8 py-6 mt-6 max-w-lg">
        <span className="hero-line inline-block bg-tomato text-butter font-block tracking-[0.3em] text-sm px-5 py-1"
          style={{ clipPath: "polygon(0 0,100% 0,96% 50%,100% 100%,0 100%,4% 50%)" }}>WELCOME</span>
        <h1 className="hero-line font-script text-cocoa text-6xl sm:text-7xl md:text-8xl leading-none mt-2">Thanksgiving</h1>
        <p className="hero-line mt-3 text-cocoa/85 text-sm md:text-base">A small note of thanks for each of you — find your name inside.</p>
        <a href="#wall" onClick={() => sfx.click()}
          className="hero-line mt-5 inline-flex bg-cocoa hover:bg-cocoa2 transition text-butter px-8 py-3 rounded-full font-block tracking-widest text-sm shadow-panel">
          FIND YOUR NOTE ↓
        </a>
      </div>

      {/* ground scene */}
      <div className="relative mt-auto w-full max-w-3xl h-[46vh] min-h-[300px]">
        <div className="absolute -bottom-24 -left-10 -right-10 h-56 rounded-[50%] bg-[#8DB03F]" />
        <div className="absolute -bottom-28 left-[10%] right-[10%] h-48 rounded-[50%] bg-[#6F9230]" />
        <SunflowerStem className="absolute bottom-0 left-[2%] w-20 sm:w-28" />
        <SunflowerStem className="absolute bottom-0 right-[2%] w-16 sm:w-24 -scale-x-100" />
        <Sunflower className="absolute bottom-2 left-[22%] w-12 hidden sm:block" />
        <Pumpkin tone="orange" className="absolute bottom-0 right-[18%] w-28 sm:w-36" />
        <Pumpkin tone="mustard" className="absolute bottom-0 right-[40%] w-16 hidden sm:block" />
        <Grapes className="absolute bottom-1 right-[8%] w-12" />
        <Apple className="absolute bottom-1 left-[26%] w-10" />
        <TurkeyUmbrella className="hero-turkey absolute bottom-3 left-1/2 -translate-x-1/2 w-44 sm:w-56" />
      </div>
    </section>
  );
}
