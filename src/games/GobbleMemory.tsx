import { useState } from "react";
import GameScreen, { Overlay } from "../components/GameScreen";
import { sfx } from "../lib/sound";

const FACES = ["🦃", "🎃", "🍂", "🌽", "🍎", "🥧"];
type Tile = { id: number; f: string; flipped: boolean; done: boolean };
const makeDeck = (): Tile[] =>
  [...FACES, ...FACES].map((f, i) => ({ id: i, f, flipped: false, done: false })).sort(() => Math.random() - 0.5);

export default function GobbleMemory() {
  const [deck, setDeck] = useState<Tile[]>(makeDeck);
  const [first, setFirst] = useState<number | null>(null);
  const [lock, setLock] = useState(false);
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState(0);
  const won = deck.every((c) => c.done);
  const pairs = deck.filter((c) => c.done).length / 2;

  const reset = () => { setDeck(makeDeck()); setFirst(null); setLock(false); setMoves(0); };

  const click = (i: number) => {
    if (lock || deck[i].flipped || deck[i].done) return;
    sfx.click();
    const next = deck.map((c, idx) => (idx === i ? { ...c, flipped: true } : c));
    if (first === null) { setDeck(next); setFirst(i); return; }
    const m = moves + 1;
    setMoves(m);
    if (deck[first].f === deck[i].f) {
      const matched = next.map((c, idx) => (idx === i || idx === first ? { ...c, done: true } : c));
      setDeck(matched); setFirst(null);
      if (matched.every((c) => c.done)) { sfx.win(); setBest((b) => (b === 0 ? m : Math.min(b, m))); }
    } else {
      setDeck(next); setLock(true);
      const a = first;
      setTimeout(() => {
        setDeck((d) => d.map((c, idx) => (idx === i || idx === a ? { ...c, flipped: false } : c)));
        setFirst(null); setLock(false);
      }, 650);
    }
  };

  return (
    <GameScreen stats={[{ label: "MOVES", value: moves }, { label: "PAIRS", value: `${pairs}/6` }, { label: "BEST", value: best || "—" }]} hint="Flip two cards — match all six pairs">
      <div className="relative cream-burst p-4">
        <div className="grid grid-cols-4 gap-2.5 max-w-md mx-auto">
          {deck.map((c, i) => {
            const on = c.flipped || c.done;
            return (
              <button key={c.id} onClick={() => click(i)} aria-label="card" className="flip aspect-[3/4]">
                <div className={`flip-inner w-full h-full ${on ? "on" : ""}`}>
                  <div className="flip-face rounded-lg bg-slate border-2 border-cocoa/40 shadow-card">
                    <span className="text-butter/80 font-script text-2xl">26</span>
                  </div>
                  <div className={`flip-face flip-back rounded-lg bg-paper border-2 text-3xl ${c.done ? "border-tomato" : "border-cocoa/30"}`}>{c.f}</div>
                </div>
              </button>
            );
          })}
        </div>
        {won && <Overlay title="All matched!" sub={`Finished in ${moves} moves.`} button="PLAY AGAIN" onClick={reset} />}
      </div>
    </GameScreen>
  );
}
