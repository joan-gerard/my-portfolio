import About from "@/components/about";
import Experience from "@/components/experience";
import HeroV3 from "@/components/HeroV3";
import SpecialtyStrip from "@/components/SpecialtyStrip";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <div>
      <HeroV3 />
      <About />
      <SpecialtyStrip />
      <Work />
      <Experience />
    </div>
  );
}
