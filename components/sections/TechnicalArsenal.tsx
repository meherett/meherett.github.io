import type { ElementType } from "react";
import { Code2, Boxes, Cog, Languages as LanguagesIcon } from "lucide-react";

type Skill = { name: string; level: number; note: string };

const GROUPS: { title: string; icon: ElementType; skills: Skill[] }[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: 5, note: "Full" },
      { name: "TypeScript", level: 5, note: "Full" },
      { name: "JavaScript", level: 5, note: "Full" },
      { name: "Solidity", level: 4, note: "Professional" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Boxes,
    skills: [
      { name: "Flask", level: 5, note: "Full" },
      { name: "FastAPI", level: 5, note: "Full" },
      { name: "React", level: 4, note: "Professional" },
      { name: "Angular CLI", level: 5, note: "Full" },
    ],
  },
  {
    title: "DevOps & Infra",
    icon: Cog,
    skills: [
      { name: "Docker", level: 5, note: "Full" },
      { name: "Kubernetes", level: 5, note: "Full" },
      { name: "CI/CD", level: 5, note: "Full" },
      { name: "Linux", level: 5, note: "Full" },
    ],
  },
];

const SPOKEN = [
  { name: "Amharic", note: "Native" },
  { name: "English", note: "Fluent" },
];

function LevelDots({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            i < level
              ? "h-1.5 w-1.5 rounded-full bg-cyan-400"
              : "h-1.5 w-1.5 rounded-full bg-zinc-700"
          }
        />
      ))}
    </span>
  );
}

export function TechnicalArsenal() {
  return (
    <section id="skills" className="scroll-mt-24">
      <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight text-zinc-100">
        Technical Arsenal
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {GROUPS.map(({ title, icon: Icon, skills }) => (
          <div
            key={title}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                {title}
              </h3>
            </div>
            <ul className="space-y-3">
              {skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="font-mono text-sm text-zinc-200">
                    {skill.name}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[11px] text-zinc-500">
                      {skill.note}
                    </span>
                    <LevelDots level={skill.level} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-16 mb-8 text-center text-3xl font-semibold tracking-tight text-zinc-100">
        Languages
      </h2>
      <div className="mx-auto flex max-w-md items-center justify-center gap-6 rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-4">
        <LanguagesIcon className="h-4 w-4 shrink-0 text-cyan-400" />
        {SPOKEN.map((lang) => (
          <span key={lang.name} className="text-sm text-zinc-300">
            {lang.name}{" "}
            <span className="text-xs text-zinc-500">({lang.note})</span>
          </span>
        ))}
      </div>
    </section>
  );
}
