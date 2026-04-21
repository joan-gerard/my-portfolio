import { AiFillCode, AiFillSmile } from "react-icons/ai";
import { Chip, GradientText, Reveal } from "../utils";

export const Skills = () => {
  const workSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "NodeJS",
    "Express",
    "Postgres",
    "MongoDB",
    "GitHub",
    "Jira",
    "AWS",
    "Docker",
    "AI",
  ];

  const funSkills = [
    "Tailwind",
    "Java",
    "Spring",
    "Figma",
    "GraphQL",
    "Python",
  ];

  return (
    <aside className="relative rounded-3xl border border-[var(--hairline-light)] bg-white p-6 md:p-8 shadow-sm h-fit">
      <Reveal width="w-full">
        <div className="mb-8">
          <h4 className="flex items-center gap-2 mb-4">
            <AiFillCode className="text-xl text-[var(--accent-mid)]" />
            <span className="font-bold text-[var(--ink)]">
              <GradientText>Use at work</GradientText>
            </span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {workSkills.map((skill) => (
              <Chip key={skill} tone="light">
                {skill}
              </Chip>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal width="w-full">
        <div>
          <h4 className="flex items-center gap-2 mb-4">
            <AiFillSmile className="text-xl text-[var(--accent-mid)]" />
            <span className="font-bold text-[var(--ink)]">
              <GradientText>Use for fun</GradientText>
            </span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {funSkills.map((skill) => (
              <Chip key={skill} tone="light">
                {skill}
              </Chip>
            ))}
          </div>
        </div>
      </Reveal>
    </aside>
  );
};

export default Skills;
