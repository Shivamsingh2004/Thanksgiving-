import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import photo from "../assets/photo.jpg";
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
    <section ref={root} className="relative py-24 px-6 text-center max-w-3xl mx-auto">
      <img src={photo} alt="With gratitude" className="closing-el mx-auto w-36 h-36 md:w-44 md:h-44 object-cover rounded-full border-4 border-gold shadow-soft" />
      <h2 className="closing-el font-display text-4xl md:text-5xl text-burnt mt-8">Let's Be Grateful</h2>
      <p className="closing-el mt-4 text-brown/80 md:text-lg leading-relaxed">
        Thank you for being part of this season. May your table be full, your heart fuller,
        and your year ahead warm, kind, and bright.
      </p>
      <p className="closing-el mt-10 font-display text-lg text-brown/70">— Shivam Singh</p>
    </section>
  );
}
