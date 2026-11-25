import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Leaf } from "./Art";
import type { LeafTone } from "./Art";

const TONES: LeafTone[] = ["orange", "mustard", "red", "green", "slate"];

export default function FallingLeaves({ count = 18 }: { count?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !wrap.current) return;
    const leaves = Array.from(wrap.current.children) as HTMLElement[];
    const ctx = gsap.context(() => {
      leaves.forEach((leaf) => {
        gsap.set(leaf, { x: Math.random() * window.innerWidth, y: -60, rotation: Math.random() * 360, opacity: 0.7 + Math.random() * 0.3 });
        gsap.to(leaf, {
          y: window.innerHeight + 80,
          x: `+=${Math.random() * 160 - 80}`,
          rotation: `+=${Math.random() * 360}`,
          duration: 10 + Math.random() * 8,
          repeat: -1, delay: Math.random() * 8, ease: "none",
        });
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduced, count]);
  if (reduced) return null;
  return (
    <div ref={wrap} aria-hidden className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="absolute top-0 left-0 block w-5 h-6 md:w-6 md:h-8">
          <Leaf tone={TONES[i % TONES.length]} className="w-full h-full" />
        </span>
      ))}
    </div>
  );
}
