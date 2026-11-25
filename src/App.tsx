import FallingLeaves from "./components/FallingLeaves";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import GreetingWall from "./components/GreetingWall";
import Arcade from "./components/Arcade";
import Closing from "./components/Closing";

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <FallingLeaves />
      <main className="relative z-10">
        <Hero />
        <Intro />
        <GreetingWall />
        <Arcade />
        <Closing />
      </main>
    </div>
  );
}
