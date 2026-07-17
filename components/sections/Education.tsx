import { GraduationCap, Server, Palette } from "lucide-react";

const EDUCATION = [
  {
    icon: GraduationCap,
    title: "BSc, Computer Science",
    org: "Admas University",
    period: "09/2018 – 08/2022",
    location: "Addis Ababa, Ethiopia",
    detail:
      "Bachelor of Science degree in Computer Science, covering algorithms, systems, and software engineering fundamentals.",
  },
  {
    icon: Server,
    title: "Back-End Engineering",
    org: "Gebeya Inc",
    period: "06/2018 – 03/2019",
    location: "Addis Ababa, Ethiopia",
    detail:
      "Intensive training focused on Node.js and Blockchain technologies — the foundation of a decentralized-systems career.",
  },
  {
    icon: Palette,
    title: "Front-End Engineering",
    org: "Gebeya Inc",
    period: "06/2017 – 09/2018",
    location: "Addis Ababa, Ethiopia",
    detail:
      "Training focused on the Angular CLI v2+ framework and modern front-end application development.",
  },
];

export function Education() {
  return (
    <section id="education" className="scroll-mt-24">
      <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight text-zinc-100">
        Education &amp; Training
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {EDUCATION.map(({ icon: Icon, title, org, period, location, detail }) => (
          <div
            key={`${org}-${title}`}
            className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-800/50 bg-cyan-900/20 text-cyan-400">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-zinc-100">
              {title}
            </h3>
            <p className="text-sm font-medium text-cyan-500/80">{org}</p>
            <p className="mt-1 text-xs text-zinc-500">
              {period} · {location}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
