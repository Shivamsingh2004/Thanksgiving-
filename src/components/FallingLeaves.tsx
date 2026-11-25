import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

const EMOJIS = ["🍂","🍁","🌾"];

export default function FallingLeaves({ count = 22 }: { count?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !wrap.current) return;
    const leaves = Array.from(wrap.current.children) as HTMLElement[];
    const ctx = gsap.context(() => {
      leaves.forEach((leaf) => {
        gsap.set(leaf, { x: Math.random() * window.innerWidth, y: -40, rotation: Math.random() * 360, opacity: 0.6 + Math.random() * 0.4 });
        gsap.to(leaf, {
          y: window.innerHeight + 60,
          x: `+=${Math.random() * 160 - 80}`,
          rotation: `+=${Math.random() * 360}`,
          duration: 10 + Math.random() * 8,
          repeat: -1, delay: Math.random() * 8, ease: "none",
        });
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduced, count]);
  return (
    <div ref={wrap} aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="absolute text-xl md:text-2xl select-none" style={{ color: i % 3 === 0 ? "#B5541F" : i % 3 === 1 ? "#E0A32E" : "#8C3A12", opacity: reduced ? 0 : undefined }}>
          {EMOJIS[i % EMOJIS.length]}
        </span>
      ))}
    </div>
  );
}
