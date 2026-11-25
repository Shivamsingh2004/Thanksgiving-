import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Leaf, Sunflower, Pumpkin } from "./Art";

export default function FallingLeaves({ count = 16 }: { count?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !wrap.current) return;
    const items = Array.from(wrap.current.children) as HTMLElement[];
    const ctx = gsap.context(() => {
      items.forEach((el) => {
        gsap.set(el, { x: Math.random() * window.innerWidth, y: -60, rotation: Math.random() * 360, opacity: 0.85 });
        gsap.to(el, {
          y: window.innerHeight + 80, x: `+=${Math.random() * 160 - 80}`, rotation: `+=${Math.random() * 360}`,
          duration: 11 + Math.random() * 8, repeat: -1, delay: Math.random() * 8, ease: "none",
        });
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduced, count]);
  if (reduced) return null;
  return (
    <div ref={wrap} aria-hidden className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="absolute top-0 left-0 block w-7 h-7 md:w-9 md:h-9">
          {i % 3 === 0 ? <Sunflower className="w-full h-full" /> : i % 3 === 1 ? <Pumpkin tone="orange" className="w-full h-full" /> : <Leaf tone="orange" className="w-full h-full" />}
        </span>
      ))}
    </div>
  );
}
