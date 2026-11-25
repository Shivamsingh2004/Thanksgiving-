import { useEffect, useRef, useState } from "react";
import GameScreen, { Overlay } from "../components/GameScreen";
import { sfx } from "../lib/sound";

type Item = { id: number; x: number; y: number; emoji: string };
const EMOJIS = ["🍎", "🌽", "🍂", "🎃", "🍇", "🥧"];

export default function HarvestCatch() {
  const [, setTick] = useState(0);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(3);
  const [state, setState] = useState<"idle" | "play" | "over">("idle");
  const items = useRef<Item[]>([]);
  const basket = useRef(44);
  const id = useRef(0);
  const sc = useRef(0);
  const lv = useRef(3);

  const moveBasket = (v: number) => { basket.current = Math.max(0, Math.min(86, v)); setTick((t) => t + 1); };

  const start = () => {
    items.current = []; sc.current = 0; lv.current = 3;
    setScore(0); setLives(3); setState("play");
  };

  useEffect(() => {
    if (state !== "play") return;
    const spawn = setInterval(() => {
      items.current.push({ id: id.current++, x: Math.random() * 86, y: -8, emoji: EMOJIS[(Math.random() * EMOJIS.length) | 0] });
    }, Math.max(380, 750 - sc.current * 12));
    const fall = setInterval(() => {
      const speed = 3 + Math.min(sc.current * 0.12, 3);
      const keep: Item[] = [];
      for (const it of items.current) {
        const ny = it.y + speed;
        if (ny > 78) {
          if (Math.abs(it.x - basket.current) < 14) { sc.current += 1; setScore(sc.current); setBest((b) => Math.max(b, sc.current)); sfx.pop(); }
          else { lv.current -= 1; setLives(lv.current); sfx.lose(); }
          continue;
        }
        keep.push({ ...it, y: ny });
      }
      items.current = keep;
      if (lv.current <= 0) { setState("over"); }
      setTick((t) => t + 1);
    }, 50);
    return () => { clearInterval(spawn); clearInterval(fall); };
  }, [state]);

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
    <GameScreen
      stats={[{ label: "CAUGHT", value: score }, { label: "LIVES", value: "❤".repeat(Math.max(lives, 0)) || "—" }, { label: "BEST", value: best }]}
      hint="Drag or use ← → to move the basket"
    >
      <div className="relative h-64 touch-none select-none overflow-hidden"
        style={{ background: "linear-gradient(#FFE9A8, #FFD66B)" }}
        onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); moveBasket(((e.clientX - r.left) / r.width) * 100 - 7); }}>
        <div className="absolute bottom-0 inset-x-0 h-6 bg-[#7FA337]" />
        {items.current.map((it) => (
          <span key={it.id} className="absolute text-2xl" style={{ left: `${it.x}%`, top: `${it.y}%` }}>{it.emoji}</span>
        ))}
        <span className="absolute bottom-3 text-4xl" style={{ left: `${basket.current}%` }}>🧺</span>
        {state === "idle" && <Overlay title="Harvest Catch" sub="Catch the harvest. Miss three and it's over." button="START" onClick={start} />}
        {state === "over" && <Overlay title="Basket's full!" sub={`You caught ${score}.`} button="PLAY AGAIN" onClick={start} />}
      </div>
    </GameScreen>
  );
}
