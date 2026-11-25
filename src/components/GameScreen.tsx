import type { ReactNode } from "react";
import { sfx } from "../lib/sound";

export type Stat = { label: string; value: string | number };

/** Arcade-style screen: HUD on top, framed stage, hint bar below. */
export default function GameScreen({ stats, hint, children }: { stats: Stat[]; hint: string; children: ReactNode }) {
  return (
    <div className="rounded-[28px] bg-cocoa p-3 sm:p-4 shadow-panel border-4 border-sun">
      <div className="flex items-stretch gap-2 mb-3">
        {stats.map((s) => (
          <div key={s.label} className="flex-1 bg-cocoa2 rounded-xl px-3 py-1.5 text-center">
            <div className="font-block tracking-[0.25em] text-[10px] text-sunlight/80">{s.label}</div>
            <div className="font-block text-xl text-butter leading-tight">{s.value}</div>
          </div>
        ))}
      </div>
      <div onPointerDown={() => sfx.pop()} className="relative rounded-2xl overflow-hidden border-2 border-cocoa2 bg-butter">
        {children}
      </div>
      <p className="mt-3 text-center text-[11px] tracking-widest uppercase text-sunlight/70 font-block">{hint}</p>
    </div>
  );
}

export function Overlay({ title, sub, button, onClick }: { title: string; sub?: string; button: string; onClick: () => void }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center bg-cocoa/80 backdrop-blur-[2px] px-4">
      <h4 className="font-script text-butter text-4xl">{title}</h4>
      {sub && <p className="text-butter/80 text-sm mt-1">{sub}</p>}
      <button onPointerDown={(e) => e.stopPropagation()} onClick={onClick}
        className="mt-4 bg-tomato hover:brightness-110 transition text-butter font-block tracking-[0.25em] text-sm px-7 py-2.5 rounded-full shadow-card">
        {button}
      </button>
    </div>
  );
}
