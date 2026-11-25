import { useState } from "react";
import GameScreen, { Overlay } from "../components/GameScreen";
import { sfx } from "../lib/sound";

const PROMPTS = [
  "Name one person you're grateful for today.",
  "Share one small thing that made you smile.",
  "Recall a kindness someone showed you.",
  "Thank someone who taught you something.",
  "Name one thing your past self would thank you for.",
];

export default function GratitudeQuest() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<string[]>([]);
  const done = entries.length >= PROMPTS.length;
  const i = Math.min(entries.length, PROMPTS.length - 1);
  const fill = (entries.length / PROMPTS.length) * 100;

  const submit = () => {
    if (!text.trim() || done) return;
    const next = [...entries, text.trim()];
    setEntries(next); setText("");
    if (next.length === PROMPTS.length) sfx.win(); else sfx.pop();
  };

  return (
    <GameScreen stats={[{ label: "NOTES", value: `${entries.length}/${PROMPTS.length}` }, { label: "JAR", value: `${Math.round(fill)}%` }]} hint="Answer five prompts to fill the jar">
      <div className="relative cream-burst p-4 sm:p-5 grid sm:grid-cols-[130px_1fr] gap-4 items-center min-h-[16rem]">
        <svg viewBox="0 0 100 130" className="w-28 mx-auto" aria-hidden>
          <defs><clipPath id="jar"><path d="M22 28 H78 V40 C92 50 92 70 90 100 C88 120 80 124 50 124 C20 124 12 120 10 100 C8 70 8 50 22 40Z" /></clipPath></defs>
          <rect x="26" y="8" width="48" height="20" rx="5" fill="#C99A2E" />
          <path d="M22 28 H78 V40 C92 50 92 70 90 100 C88 120 80 124 50 124 C20 124 12 120 10 100 C8 70 8 50 22 40Z" fill="#fff" fillOpacity=".55" stroke="#4A2416" strokeWidth="3" />
          <g clipPath="url(#jar)">
            <rect x="0" y={124 - (fill / 100) * 96} width="100" height="130" fill="#F28A1E" style={{ transition: "y .6s" }} />
            <rect x="0" y={124 - (fill / 100) * 96} width="100" height="6" fill="#FDB022" style={{ transition: "y .6s" }} />
          </g>
        </svg>
        <div>
          {!done && (
            <>
              <p className="font-serif italic text-ink text-center sm:text-left mb-3">{PROMPTS[i]}</p>
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="I'm grateful for..." className="w-full p-2.5 rounded-lg border-2 border-cocoa/30 bg-paper text-ink outline-none focus:border-tomato" />
              <button onClick={submit} className="mt-2 w-full bg-tomato text-butter font-block tracking-[0.25em] text-sm py-2.5 rounded-full">ADD TO JAR</button>
            </>
          )}
          <ul className="mt-3 space-y-1 text-sm max-h-24 overflow-auto no-scrollbar">
            {entries.map((e, k) => <li key={k} className="bg-paper/80 rounded-full px-3 py-1 text-ink truncate">🍂 {e}</li>)}
          </ul>
        </div>
        {done && <Overlay title="Jar full!" sub="You completed your gratitude quest." button="START NEW JAR" onClick={() => { setEntries([]); setText(""); }} />}
      </div>
    </GameScreen>
  );
}
