import { useEffect, useRef, useState } from "react";
import GameCard from "../components/GameCard";
import { sfx } from "../lib/sound";

type Item = { id: number; x: number; y: number; emoji: string };
const EMOJIS = ["🍎", "🌽", "🍂", "🎃", "🍇"];

export default function HarvestCatch() {
  const [items, setItems] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [basketX, setBasketX] = useState(45);
  const basket = useRef(45);
  const id = useRef(0);

  const moveBasket = (v: number) => {
    basket.current = Math.max(0, Math.min(88, v));
    setBasketX(basket.current);
  };

  useEffect(() => {
    if (!playing) return;
    const spawn = setInterval(() => {
      setItems((p) => [...p, { id: id.current++, x: Math.random() * 88, y: 0, emoji: EMOJIS[(Math.random() * EMOJIS.length) | 0] }]);
    }, 700);
    const fall = setInterval(() => {
      setItems((prev) => {
        let caught = 0;
        const next = prev.map((it) => ({ ...it, y: it.y + 6 })).filter((it) => {
          if (it.y > 80) {
            if (Math.abs(it.x - basket.current) < 14) caught++;
            return false;
          }
          return true;
        });
        if (caught) { setTimeout(() => { setScore((s) => s + caught); sfx.pop(); }, 0); }
        return next;
      });
    }, 60);
    return () => { clearInterval(spawn); clearInterval(fall); };
  }, [playing]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowLeft") moveBasket(basket.current - 8);
      if (e.key === "ArrowRight") moveBasket(basket.current + 8);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <GameCard title="Harvest Catch 🧺" subtitle="Drag or use ← → to catch falling harvest.">
      <div
        className="relative h-56 bg-burnt/30 rounded-xl overflow-hidden touch-none select-none"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          moveBasket(((e.clientX - r.left) / r.width) * 100 - 6);
        }}
      >
        {items.map((it) => (
          <span key={it.id} className="absolute text-2xl" style={{ left: `${it.x}%`, top: `${it.y}%` }}>{it.emoji}</span>
        ))}
        <span className="absolute bottom-1 text-3xl" style={{ left: `${basketX}%` }}>🧺</span>
        {!playing && <div className="absolute inset-0 flex items-center justify-center text-sm text-cream/80">Press Start</div>}
      </div>
      <div className="flex items-center justify-between mt-3 text-sm">
        <span>Caught: {score}</span>
        <button onClick={() => { setScore(0); setItems([]); setPlaying(true); }} className="bg-gold text-brown px-4 py-1.5 rounded-full font-semibold">
          {playing ? "Restart" : "Start"}
        </button>
      </div>
    </GameCard>
  );
}
