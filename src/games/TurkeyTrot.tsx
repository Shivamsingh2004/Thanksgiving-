import { useCallback, useEffect, useRef, useState } from "react";
import GameCard from "../components/GameCard";
import { sfx } from "../lib/sound";

export default function TurkeyTrot() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [view, setView] = useState({ y: 0, obs: 100 });

  const y = useRef(0);
  const vy = useRef(0);
  const obs = useRef(100);
  const scoreRef = useRef(0);
  const raf = useRef(0);
  const last = useRef(0);

  const start = useCallback(() => {
    y.current = 0; vy.current = 0; obs.current = 100; scoreRef.current = 0; last.current = 0;
    setScore(0); setOver(false); setPlaying(true); setView({ y: 0, obs: 100 });
  }, []);

  const jump = useCallback(() => {
    if (y.current <= 0) { vy.current = 640; sfx.click(); }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const loop = (t: number) => {
      const dt = last.current ? Math.min((t - last.current) / 1000, 0.05) : 0.016;
      last.current = t;
      const speed = 55 + scoreRef.current * 3; // % per second
      obs.current -= speed * dt;
      vy.current -= 1900 * dt;
      y.current = Math.max(0, y.current + vy.current * dt);
      if (y.current === 0) vy.current = 0;

      if (obs.current < -10) {
        obs.current = 100;
        scoreRef.current += 1;
        setScore(scoreRef.current);
        setBest((b) => Math.max(b, scoreRef.current));
      }
      // collision: obstacle near turkey (left 10%) and turkey low
      if (obs.current < 18 && obs.current > 6 && y.current < 24) {
        setOver(true); setPlaying(false); sfx.lose();
        setView({ y: y.current, obs: obs.current });
        return;
      }
      setView({ y: y.current, obs: obs.current });
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      e.preventDefault();
      if (playing) jump(); else start();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [playing, jump, start]);

  return (
    <GameCard title="Turkey Trot 🦃" subtitle="Tap / Space to jump. Dodge the cacti.">
      <div
        className="relative h-40 bg-burnt/30 rounded-xl overflow-hidden cursor-pointer select-none touch-none"
        onPointerDown={() => (playing ? jump() : start())}
      >
        <div className="absolute bottom-2 text-4xl" style={{ left: "10%", transform: `translateY(-${view.y}px)` }}>🦃</div>
        <div className="absolute bottom-2 text-3xl" style={{ left: `${view.obs}%` }}>🌵</div>
        {!playing && !over && <div className="absolute inset-0 flex items-center justify-center text-sm text-cream/80">Tap to start</div>}
      </div>
      <div className="flex items-center justify-between mt-3 text-sm">
        <span>Score: {score} · Best: {best}</span>
        <button onClick={start} className="bg-gold text-brown px-4 py-1.5 rounded-full font-semibold">
          {playing || over ? "Restart" : "Start"}
        </button>
      </div>
      {over && <p className="text-red-300 text-sm mt-1">Game over — nice run!</p>}
    </GameCard>
  );
}
