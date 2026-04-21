import { AiFillCode, AiFillSmile } from "react-icons/ai";
import { Chip, Reveal } from "../utils";

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
    <div className="relative">
      <Reveal>
        <div>
          <h4 className="flex items-center mb-6">
            <AiFillCode className="text-indigo-500 text-2xl" />
            <span className="font-bold ml-2 text-white">Use at work</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-12">
            {workSkills.map((skill) => (
              <Chip key={skill}>{skill}</Chip>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div>
          <h4 className="flex items-center mb-6">
            <AiFillSmile className="text-indigo-500 text-2xl" />
            <span className="font-bold ml-2 text-white">Use for fun</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-12">
            {funSkills.map((skill) => (
              <Chip key={skill}>{skill}</Chip>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};
