import { Sunflower, Pumpkin, Leaf } from "./Art";
import type { PumpkinTone } from "./Art";

const SF: [string, string, number][] = [
  ["4%", "6%", 120], ["84%", "4%", 150], ["70%", "32%", 90], ["8%", "42%", 140], ["90%", "58%", 120], ["30%", "70%", 100], ["76%", "88%", 150], ["4%", "90%", 110],
];
const PK: [string, string, number, PumpkinTone][] = [
  ["22%", "14%", 110, "orange"], ["60%", "18%", 90, "cream"], ["46%", "48%", 130, "orange"], ["16%", "62%", 100, "blue"], ["84%", "76%", 120, "mustard"], ["52%", "92%", 140, "orange"],
];

/** Fixed sunburst with big sunflowers and pumpkins, seen through the glass panels. */
export default function Backdrop() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden sunburst">
      {SF.map(([l, t, w], i) => (
        <Sunflower key={`s${i}`} className="absolute opacity-80" style={{ left: l, top: t, width: w, transform: `rotate(${i * 23}deg)` }} />
      ))}
      {PK.map(([l, t, w, tone], i) => (
        <Pumpkin key={`p${i}`} tone={tone} className="absolute opacity-90" style={{ left: l, top: t, width: w }} />
      ))}
      <Leaf tone="green" className="absolute w-8 left-[40%] top-[30%] rotate-45 opacity-80" />
      <Leaf tone="red" className="absolute w-8 left-[66%] top-[60%] -rotate-12 opacity-80" />
    </div>
  );
}
