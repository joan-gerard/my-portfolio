import About from "@/components/about";
import Experience from "@/components/experience";
import Hero_V3 from "@/components/Hero_V3";
import SpecialtyStrip from "@/components/SpecialtyStrip";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <div>
      <Hero_V3 />
      <About />
      <SpecialtyStrip />
      <Work />
      <Experience />
    </div>
  );
}
