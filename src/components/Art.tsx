import type { CSSProperties } from "react";

type P = { className?: string; style?: CSSProperties };

/* ---------- Pumpkin (card palette: orange / cream / slate-blue / mustard) ---------- */
export type PumpkinTone = "orange" | "cream" | "blue" | "mustard";
const TONES: Record<PumpkinTone, [string, string, string]> = {
  orange: ["#D9722E", "#C0601F", "#8A4416"],
  cream: ["#F1E4C3", "#E3D2A6", "#B9A57A"],
  blue: ["#7E98A6", "#657F8E", "#3F5F6E"],
  mustard: ["#E2B03C", "#CB9A2C", "#9A7218"],
};
export function Pumpkin({ tone = "orange", className, style }: P & { tone?: PumpkinTone }) {
  const [a, b, c] = TONES[tone];
  return (
    <svg viewBox="0 0 100 80" className={className} style={style} aria-hidden>
      <path d="M48 14 C46 6 52 2 58 3" stroke="#4A3A22" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="46" rx="44" ry="31" fill={b} />
      <ellipse cx="26" cy="46" rx="22" ry="30" fill={a} />
      <ellipse cx="74" cy="46" rx="22" ry="30" fill={a} />
      <ellipse cx="50" cy="46" rx="15" ry="31" fill={a} />
      <path d="M50 15 V77 M34 18 C26 40 26 54 34 75 M66 18 C74 40 74 54 66 75" stroke={c} strokeWidth="1.6" fill="none" opacity=".7" />
    </svg>
  );
}

/* ---------- Leaf ---------- */
export type LeafTone = "mustard" | "slate" | "orange" | "red" | "green";
const LEAF: Record<LeafTone, string> = { mustard: "#C99A2E", slate: "#3F5F6E", orange: "#F28A1E", red: "#E5483B", green: "#7FA337" };
export function Leaf({ tone = "mustard", className, style }: P & { tone?: LeafTone }) {
  return (
    <svg viewBox="0 0 60 80" className={className} style={style} aria-hidden>
      <path d="M30 4 C54 20 58 52 30 76 C2 52 6 20 30 4Z" fill={LEAF[tone]} />
      <path d="M30 10 V78 M30 30 L16 22 M30 44 L12 36 M30 30 L44 22 M30 44 L48 36 M30 58 L18 52 M30 58 L42 52" stroke="#000" strokeOpacity=".25" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

/* ---------- Sunflower ---------- */
export function Sunflower({ className, style }: P) {
  const petals = Array.from({ length: 14 }, (_, i) => i * (360 / 14));
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      {petals.map((r) => (
        <ellipse key={r} cx="50" cy="20" rx="8" ry="17" fill="#FDB022" transform={`rotate(${r} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="17" fill="#8A4416" />
      <circle cx="50" cy="50" r="10" fill="#5E2F1C" />
    </svg>
  );
}

/* ---------- Bunting flags ---------- */
export function Bunting({ className }: P) {
  const cols = ["#E5483B", "#FDB022", "#F28A1E", "#E5483B", "#FDB022", "#F28A1E", "#E5483B", "#FDB022", "#F28A1E", "#E5483B", "#FDB022", "#F28A1E"];
  return (
    <svg viewBox="0 0 600 70" preserveAspectRatio="none" className={className} aria-hidden>
      <path d="M0 8 Q300 40 600 8" stroke="#8A4416" strokeWidth="2" fill="none" />
      {cols.map((c, i) => {
        const x = 20 + i * 48;
        const y = 8 + 32 * (1 - Math.pow((x - 300) / 300, 2)) * 0.5 * 1.0;
        return <path key={i} d={`M${x} ${y} L${x + 34} ${y + 4} L${x + 15} ${y + 46}Z`} fill={c} />;
      })}
    </svg>
  );
}

/* ---------- Turkey (flat vector, like the story panels) ---------- */
export function Turkey({ className, style, hat = true }: P & { hat?: boolean }) {
  const fan = [-72, -48, -24, 0, 24, 48, 72];
  const cols = ["#8A2F1B", "#B23A22", "#D9722E", "#B23A22", "#D9722E", "#B23A22", "#8A2F1B"];
  return (
    <svg viewBox="0 0 240 220" className={className} style={style} aria-hidden>
      {fan.map((r, i) => (
        <g key={r} transform={`rotate(${r} 120 140)`}>
          <ellipse cx="120" cy="62" rx="20" ry="52" fill={cols[i]} />
          <ellipse cx="120" cy="50" rx="10" ry="26" fill="#F6B73C" opacity=".85" />
        </g>
      ))}
      <ellipse cx="120" cy="150" rx="52" ry="50" fill="#5E2F1C" />
      <ellipse cx="120" cy="158" rx="34" ry="34" fill="#7A3E24" />
      <path d="M104 118 Q120 150 136 118 Z" fill="#E5483B" />
      <circle cx="120" cy="100" r="30" fill="#E86B6B" />
      <path d="M118 108 Q108 134 124 132 Q132 120 126 108Z" fill="#D63A3A" />
      <path d="M112 112 L136 112 L124 128Z" fill="#FDB022" />
      <circle cx="108" cy="94" r="7" fill="#fff" /><circle cx="132" cy="94" r="7" fill="#fff" />
      <circle cx="109" cy="95" r="3.6" fill="#1E1A2B" /><circle cx="131" cy="95" r="3.6" fill="#1E1A2B" />
      {hat && (
        <g>
          <path d="M120 62 C118 52 124 48 130 49" stroke="#4A3A22" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M84 84 C86 56 154 56 156 84 C140 76 100 76 84 84Z" fill="#F28A1E" />
          <path d="M120 60 V80 M104 64 C100 70 100 76 104 79 M136 64 C140 70 140 76 136 79" stroke="#C0601F" strokeWidth="2" fill="none" />
        </g>
      )}
      <path d="M100 196 V214 M92 214 H108 M140 196 V214 M132 214 H148" stroke="#FDB022" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Wreath frame with centre text/children (like the card's 2026 ring) ---------- */
export function Wreath({ children, className }: { children?: React.ReactNode; className?: string }) {
  const leaves: [number, LeafTone][] = [[0, "slate"], [40, "mustard"], [80, "slate"], [120, "mustard"], [160, "slate"], [200, "mustard"], [240, "slate"], [280, "mustard"], [320, "slate"]];
  return (
    <div className={`relative aspect-square ${className ?? ""}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" aria-hidden>
        <circle cx="100" cy="100" r="78" fill="none" stroke="#A9A39A" strokeWidth="1.2" />
        {leaves.map(([a, t], i) => (
          <g key={i} transform={`rotate(${a} 100 100) translate(100 20) rotate(${i % 2 ? 25 : -25})`}>
            <path d="M0 -12 C14 -4 14 10 0 20 C-14 10 -14 -4 0 -12Z" fill={LEAF[t]} />
          </g>
        ))}
      </svg>
      <div className="absolute inset-[16%] rounded-full overflow-hidden flex items-center justify-center">{children}</div>
    </div>
  );
}

/* ---------- Brand footer line from the card ---------- */
export function BrandRow({ dark = false }: { dark?: boolean }) {
  const c = dark ? "text-butter" : "text-ink";
  return (
    <div className={`flex items-center justify-between ${c}`}>
      <span className="font-body font-light tracking-tight text-lg leading-none"><span className="font-semibold">a</span>360</span>
      <span className="font-body font-semibold tracking-[0.3em] text-[10px] sm:text-xs">HAPPY THANKSGIVING · 2026</span>
      <span className="font-body font-bold tracking-wide text-sm leading-none">DROISYS</span>
    </div>
  );
}
