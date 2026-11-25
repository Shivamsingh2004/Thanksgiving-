import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import photo from "../assets/photo.jpg";
import { Wreath, Pumpkin, BrandRow, Leaf } from "./Art";
import { SENDER } from "../data/messages";
gsap.registerPlugin(ScrollTrigger);

export default function Closing() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".closing-el", { y: 40, opacity: 0, duration: 0.9, stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section ref={root} className="sunburst-dark relative pt-24 pb-10 px-6 text-center overflow-hidden">
      <Leaf tone="orange" className="absolute w-6 left-[12%] top-24 rotate-12" />
      <Leaf tone="mustard" className="absolute w-5 right-[14%] top-40 -rotate-12" />
      <Pumpkin tone="blue" className="absolute bottom-16 left-2 w-24 md:w-36" />
      <Pumpkin tone="orange" className="absolute bottom-12 left-20 md:left-32 w-20 md:w-28" />
      <Pumpkin tone="cream" className="absolute bottom-14 right-4 w-20 md:w-28" />

      <div className="relative max-w-2xl mx-auto">
        <Wreath className="closing-el mx-auto w-60 md:w-72">
          <img src={photo} alt="With gratitude" className="w-full h-full object-cover rounded-full" />
        </Wreath>
        <p className="closing-el font-script text-butter text-5xl md:text-6xl mt-4">Let's be</p>
        <h2 className="closing-el font-block text-tomato text-6xl md:text-8xl tracking-wide leading-none">GRATEFUL</h2>
        <p className="closing-el mt-6 text-butter/85 md:text-lg leading-relaxed max-w-lg mx-auto">
          Thank you for being part of this season. May your table be full, your heart fuller, and your year ahead warm, kind, and bright.
        </p>
        <p className="closing-el mt-6 font-serif italic text-xl text-butter">— {SENDER}</p>
      </div>
      <div className="relative max-w-3xl mx-auto mt-24 pt-4 border-t border-butter/20"><BrandRow dark /></div>
    </section>
  );
}
