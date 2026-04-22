import { MarqueeStrip } from "@/components/utils";

const specialties = [
  "Full Stack Engineering",
  "DevOps in Progress",
  "Cloud & AWS",
  "React & Next.js",
  "Web Performance",
  "AI Integration",
];

const SpecialtyStrip = () => {
  return (
    <div data-section-theme="dark">
      <MarqueeStrip items={specialties} tone="dark" duration={35} size="lg" />
    </div>
  );
};

export default SpecialtyStrip;
