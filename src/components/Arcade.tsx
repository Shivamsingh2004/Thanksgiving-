import { useState } from "react";
import TurkeyTrot from "../games/TurkeyTrot";
import HarvestCatch from "../games/HarvestCatch";
import GobbleMemory from "../games/GobbleMemory";
import GratitudeQuest from "../games/GratitudeQuest";
import { Pumpkin, Sunflower } from "./Art";
import { sfx } from "../lib/sound";

const GAMES = [
  { id: "trot", label: "Turkey Trot", icon: "🦃", blurb: "Jump the pumpkins", C: TurkeyTrot },
  { id: "catch", label: "Harvest Catch", icon: "🧺", blurb: "Catch falling harvest", C: HarvestCatch },
  { id: "memory", label: "Gobble Memory", icon: "🃏", blurb: "Match the pairs", C: GobbleMemory },
  { id: "quest", label: "Gratitude Jar", icon: "🫙", blurb: "Fill it with thanks", C: GratitudeQuest },
];

export default function Arcade() {
  const [active, setActive] = useState("trot");
  const G = GAMES.find((g) => g.id === active)!;
  return (
    <section id="arcade" className="relative py-24 px-5">
      <Sunflower className="absolute top-16 -left-2 w-24" />
      <Pumpkin tone="orange" className="absolute bottom-6 -right-2 w-32" />
      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-script text-cocoa text-5xl md:text-6xl">Game Time</h2>
          <p className="font-block tracking-[0.3em] text-tomato text-sm mt-1">PICK A GAME · PLAY A LITTLE</p>
        </div>
        <div role="tablist" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
          {GAMES.map((g) => (
            <button key={g.id} role="tab" aria-selected={g.id === active} onClick={() => { sfx.click(); setActive(g.id); }}
              className={`rounded-2xl px-3 py-3 text-center transition border-2 ${g.id === active ? "bg-cocoa text-butter border-cocoa shadow-panel -translate-y-0.5" : "glass text-cocoa hover:bg-white/60"}`}>
              <div className="text-2xl">{g.icon}</div>
              <div className="font-block tracking-wider text-sm mt-0.5">{g.label.toUpperCase()}</div>
              <div className={`text-[10px] ${g.id === active ? "text-butter/70" : "text-cocoa/60"}`}>{g.blurb}</div>
            </button>
          ))}
        </div>
        <G.C key={active} />
      </div>
    </section>
  );
}
