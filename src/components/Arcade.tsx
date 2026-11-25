import TurkeyTrot from "../games/TurkeyTrot";
import HarvestCatch from "../games/HarvestCatch";
import GobbleMemory from "../games/GobbleMemory";
import GratitudeQuest from "../games/GratitudeQuest";

export default function Arcade() {
  return (
    <section id="arcade" className="relative py-20 px-6 max-w-6xl mx-auto">
      <h2 className="font-display text-4xl md:text-5xl text-center text-burnt mb-3">Thanksgiving Arcade</h2>
      <p className="text-center text-brown/70 mb-12 max-w-lg mx-auto">Four games. One warm season. Play alone or share the fun.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <TurkeyTrot />
        <HarvestCatch />
        <GobbleMemory />
        <GratitudeQuest />
      </div>
    </section>
  );
}
