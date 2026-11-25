import { useCallback, useEffect, useRef, useState } from "react";
import GameScreen, { Overlay } from "../components/GameScreen";
import { Turkey, Pumpkin } from "../components/Art";
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
      const speed = 55 + scoreRef.current * 3;
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
      if (obs.current < 18 && obs.current > 6 && y.current < 30) {
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
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "BUTTON")) return;
      e.preventDefault();
      if (playing) jump(); else start();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [playing, jump, start]);

  return (
    <GameScreen stats={[{ label: "SCORE", value: score }, { label: "BEST", value: best }]} hint="Tap the field or press Space to jump">
      <div className="relative h-64 cursor-pointer select-none touch-none overflow-hidden"
        style={{ background: "linear-gradient(#FFE9A8 0%, #FFD66B 70%)" }}
        onPointerDown={() => (playing ? jump() : undefined)}>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[140%] h-[140%] opacity-40"
          style={{ background: "repeating-conic-gradient(from 0deg at 50% 100%, #FDB022 0deg 8deg, transparent 8deg 16deg)" }} />
        <div className="absolute bottom-0 inset-x-0 h-14 bg-[#7FA337]" />
        <div className="absolute bottom-0 inset-x-0 h-4 bg-[#5E7F25]" />
        <div className="absolute bottom-10" style={{ left: "8%", transform: `translateY(-${view.y}px)` }}>
          <Turkey className="w-20" hat={false} />
        </div>
        <div className="absolute bottom-10" style={{ left: `${view.obs}%` }}>
          <Pumpkin tone="orange" className="w-14" />
        </div>
        {!playing && !over && <Overlay title="Turkey Trot" sub="Hop over the pumpkins!" button="START" onClick={start} />}
        {over && <Overlay title="Gobbled up!" sub={`You hopped ${score} pumpkin${score === 1 ? "" : "s"}.`} button="TRY AGAIN" onClick={start} />}
      </div>
    </GameScreen>
  );
}
