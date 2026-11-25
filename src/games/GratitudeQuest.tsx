import { useState } from "react";
import GameCard from "../components/GameCard";
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

  const submit = () => {
    if (!text.trim() || done) return;
    const next = [...entries, text.trim()];
    setEntries(next);
    setText("");
    if (next.length === PROMPTS.length) sfx.win(); else sfx.pop();
  };

  return (
    <GameCard title="Gratitude Quest ✨" subtitle="Answer 5 prompts and grow your gratitude jar.">
      {!done && <p className="italic text-center mb-3 text-cream/90">{PROMPTS[i]}</p>}
      {!done && (
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="I'm grateful for..."
            className="w-full p-2 rounded text-brown outline-none focus:ring-2 focus:ring-gold"
          />
          <button onClick={submit} className="mt-2 w-full bg-gold text-brown py-2 rounded-full font-semibold">Add Gratitude ({entries.length}/{PROMPTS.length})</button>
        </>
      )}
      {done && (
        <div className="text-center py-6">
          <p className="text-gold font-display text-xl">Jar full! 🫙✨</p>
          <p className="text-cream/80 text-sm mt-1">You completed your gratitude quest.</p>
        </div>
      )}
      <ul className="mt-3 space-y-1 text-sm list-disc pl-5 max-h-32 overflow-auto no-scrollbar">
        {entries.map((e, k) => <li key={k}>{e}</li>)}
      </ul>
      <div className="flex justify-end mt-2">
        <button onClick={() => { setEntries([]); setText(""); }} className="bg-burnt text-cream px-4 py-1.5 rounded-full text-sm font-semibold">Restart</button>
      </div>
    </GameCard>
  );
}
