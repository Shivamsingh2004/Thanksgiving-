let ctx: AudioContext | null = null;
function get() {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx;
}
export function beep(freq = 660, duration = 0.08, type: OscillatorType = "sine") {
  const a = get(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.value = 0.08;
  o.connect(g); g.connect(a.destination);
  o.start(); o.stop(a.currentTime + duration);
}
export const sfx = {
  click: () => beep(520, 0.06, "triangle"),
  pop: () => beep(880, 0.07, "square"),
  win: () => { beep(660,0.1); setTimeout(()=>beep(880,0.12),90); setTimeout(()=>beep(1180,0.16),200); },
  lose: () => { beep(300,0.14,"sawtooth"); setTimeout(()=>beep(180,0.22,"sawtooth"),120); },
};
