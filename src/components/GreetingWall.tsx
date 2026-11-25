import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { CARDS, SENDER } from "../data/messages";
import type { Card } from "../data/messages";
import { sfx } from "../lib/sound";
import { Sunflower, Pumpkin, Wreath, BrandRow } from "./Art";

function Note({ c, dir }: { c: Card; dir: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    gsap.fromTo(ref.current, { x: dir * 90, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
  }, [dir, reduced]);
  return (
    <div ref={ref} className="glass relative rounded-[28px] overflow-hidden">
      <Sunflower className="absolute -top-8 -left-8 w-28" />
      <Pumpkin tone="orange" className="absolute bottom-10 left-3 w-16" />
      <Pumpkin tone="blue" className="absolute bottom-6 left-16 w-12" />
      <Pumpkin tone="cream" className="absolute bottom-4 left-[104px] w-9" />
      <div className="relative px-6 sm:px-10 pt-14 pb-24 lg:pr-72">
        <div className="flex items-end gap-3 pl-14">
          <span className="font-serif italic text-2xl text-ink">Dear</span>
          <span className="flex-1 border-b border-line/70 font-serif italic text-xl text-ink pb-0.5">{c.name}</span>
        </div>
        <p className="ruled-glass font-serif italic text-ink/90 mt-5 text-[14px] md:text-[15px]">{c.message}</p>
        <div className="flex items-end gap-3 mt-6 sm:w-2/3 sm:ml-auto">
          <span className="font-serif italic text-2xl text-ink">From</span>
          <span className="flex-1 border-b border-line/70 font-serif italic text-lg text-ink pb-0.5">{SENDER}</span>
        </div>
      </div>
      <Wreath className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-56">
        <span className="font-block tracking-[0.35em] text-ink text-lg">2026</span>
      </Wreath>
      <div className="absolute bottom-3 left-[150px] right-5"><BrandRow /></div>
    </div>
  );
}

export default function GreetingWall() {
  const [sel, setSel] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const prev = useRef<number | null>(null);
  const row = useRef<HTMLDivElement>(null);

  const pick = (i: number) => {
    sfx.click();
    setDir(prev.current === null || i >= prev.current ? 1 : -1);
    prev.current = i;
    setSel(i);
  };
  const slide = (d: number) => { sfx.click(); row.current?.scrollBy({ left: d * 240, behavior: "smooth" }); };

  return (
    <section id="wall" className="relative py-24 px-4">
      <div className="text-center mb-10">
        <span className="inline-block bg-tomato text-butter font-block tracking-[0.3em] text-sm px-5 py-1"
          style={{ clipPath: "polygon(0 0,100% 0,96% 50%,100% 100%,0 100%,4% 50%)" }}>FOR YOU</span>
        <h2 className="font-script text-cocoa text-5xl md:text-6xl mt-3">Find Your Note</h2>
        <p className="text-cocoa/80 mt-2 text-sm">Slide, tap your name, and open your own card.</p>
      </div>

      {/* sliding name selector */}
      <div className="max-w-4xl mx-auto glass rounded-full flex items-center gap-1 p-2">
        <button onClick={() => slide(-1)} aria-label="Slide left" className="shrink-0 w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 transition font-bold text-cocoa">‹</button>
        <div ref={row} className="snap-row flex-1 flex gap-2 overflow-x-auto no-scrollbar py-1">
          {CARDS.map((c, i) => (
            <button key={c.name} onClick={() => pick(i)}
              className={`shrink-0 flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full text-sm font-medium transition border ${sel === i ? "bg-cocoa text-butter border-cocoa shadow-panel" : "bg-white/40 text-cocoa border-white/60 hover:bg-white/70"}`}>
              <Sunflower className="w-6 h-6" />{c.name}
            </button>
          ))}
        </div>
        <button onClick={() => slide(1)} aria-label="Slide right" className="shrink-0 w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 transition font-bold text-cocoa">›</button>
      </div>

      {/* only the chosen person's note is rendered */}
      <div className="max-w-4xl mx-auto mt-8 min-h-[22rem]">
        {sel === null ? (
          <div className="glass rounded-[28px] py-16 px-6 text-center relative overflow-hidden">
            <Pumpkin tone="orange" className="w-24 mx-auto floaty" />
            <p className="font-script text-cocoa text-3xl mt-4">Your note is waiting</p>
            <p className="text-cocoa/75 text-sm mt-1">Choose your name above to open it.</p>
          </div>
        ) : (
          <Note key={CARDS[sel].name} c={CARDS[sel]} dir={dir} />
        )}
      </div>
    </section>
  );
}
