import { AiFillCode, AiFillSmile } from "react-icons/ai";
import { Chip } from "../utils/Chip";
import Reveal from "../utils/Reveal";

export const Skills = () => {
  const workSkills = [
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "React",
    "Redux",
    "NodeJS",
    "Express",
    "Postgres",
    "MongoDB",
    "GitHub",
    "Jira",
    "Heroku",
    "AWS",
  ];

  const funSkills = [
    "Rust",
    "Tailwind",
    "Java",
    "Spring",
    "Figma",
    "Whimsical",
    "Planetscale",
    "GraphQL",
    "Python",
    "FastAPI",
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
