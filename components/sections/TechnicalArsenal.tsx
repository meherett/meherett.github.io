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

const SPOKEN: { name: string; note?: string }[] = [
  { name: "Amharic", note: "Native" },
  { name: "English", note: "Intermediate" },
];

function LevelDots({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            i < level
              ? "h-1.5 w-1.5 rounded-none bg-black"
              : "h-1.5 w-1.5 rounded-none border border-black bg-[#C0C0C0]"
          }
        />
      ))}
    </span>
  );
}

export function TechnicalArsenal() {
  return (
    <section id="skills" className="scroll-mt-24">
      <h2 className="mb-8 text-center">
        <span className="inline-block border-2 border-black bg-[#FFCC00] px-4 py-1 text-2xl font-bold uppercase tracking-tight text-black shadow-[3px_3px_0_#000] md:text-3xl">
          Technical Arsenal
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {GROUPS.map(({ title, icon: Icon, skills }) => (
          <div
            key={title}
            className="rounded-none border-2 border-black bg-white p-5 shadow-[3px_3px_0_#000]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-black" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-black">
                {title}
              </h3>
            </div>
            <ul className="space-y-3">
              {skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="font-mono text-sm text-black">
                    {skill.name}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[11px] text-black/60">
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

      <h2 className="mt-16 mb-8 text-center">
        <span className="inline-block border-2 border-black bg-[#FFCC00] px-4 py-1 text-2xl font-bold uppercase tracking-tight text-black shadow-[3px_3px_0_#000] md:text-3xl">
          Languages
        </span>
      </h2>
      <div className="mx-auto flex max-w-md items-center justify-center gap-6 rounded-none border-2 border-black bg-white px-6 py-4 shadow-[3px_3px_0_#000]">
        <LanguagesIcon className="h-4 w-4 shrink-0 text-black" />
        {SPOKEN.map((lang) => (
          <span key={lang.name} className="text-sm text-black">
            {lang.name}
            {lang.note && (
              <span className="text-xs text-black/60"> ({lang.note})</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
