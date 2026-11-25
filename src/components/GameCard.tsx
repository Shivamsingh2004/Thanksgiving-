import type { ReactNode } from "react";
import { sfx } from "../lib/sound";

export default function GameCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="bg-brown text-cream rounded-3xl p-6 shadow-soft border border-gold/20 flex flex-col">
      <div className="mb-3">
        <h3 className="font-display text-2xl text-gold">{title}</h3>
        <p className="text-xs text-cream/70 mt-1">{subtitle}</p>
      </div>
      <div onPointerDown={() => sfx.pop()} className="flex-1">{children}</div>
    </div>
  );
}
