import { useState } from "react";
import GameCard from "../components/GameCard";
import { sfx } from "../lib/sound";

const FACES = ["🦃", "🎃", "🍂", "🌽", "🍎", "🥧"];
type Tile = { id: number; f: string; flipped: boolean; done: boolean };
const makeDeck = (): Tile[] =>
  [...FACES, ...FACES]
    .map((f, i) => ({ id: i, f, flipped: false, done: false }))
    .sort(() => Math.random() - 0.5);

export default function GobbleMemory() {
  const [deck, setDeck] = useState<Tile[]>(makeDeck);
  const [first, setFirst] = useState<number | null>(null);
  const [lock, setLock] = useState(false);
  const [moves, setMoves] = useState(0);
  const won = deck.every((c) => c.done);

  const click = (i: number) => {
    if (lock || deck[i].flipped || deck[i].done) return;
    sfx.click();
    const next = deck.map((c, idx) => (idx === i ? { ...c, flipped: true } : c));
    if (first === null) { setDeck(next); setFirst(i); return; }
    setMoves((m) => m + 1);
    if (deck[first].f === deck[i].f) {
      const matched = next.map((c, idx) => (idx === i || idx === first ? { ...c, done: true } : c));
      setDeck(matched);
      setFirst(null);
      if (matched.every((c) => c.done)) sfx.win();
    } else {
      setDeck(next);
      setLock(true);
      const a = first;
      setTimeout(() => {
        setDeck((d) => d.map((c, idx) => (idx === i || idx === a ? { ...c, flipped: false } : c)));
        setFirst(null); setLock(false);
      }, 650);
    }
  };

  return (
    <GameCard title="Gobble Memory 🧠" subtitle="Flip and match all 6 pairs. Fewer moves is better.">
      <div className="grid grid-cols-4 gap-2">
        {deck.map((c, i) => (
          <button key={c.id} onClick={() => click(i)} className="aspect-square rounded-lg bg-burnt/40 hover:bg-burnt/60 text-2xl flex items-center justify-center transition">
            {c.flipped || c.done ? c.f : "❓"}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 text-sm">
        <span>Moves: {moves}{won ? " · You won! 🎉" : ""}</span>
        <button onClick={() => { setDeck(makeDeck()); setFirst(null); setLock(false); setMoves(0); }} className="bg-gold text-brown px-4 py-1.5 rounded-full font-semibold">Restart</button>
      </div>
    </GameCard>
  );
}
