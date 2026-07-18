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
    highlight: true,
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
      <h2 className="mb-8 text-center">
        <span className="inline-block border-2 border-black bg-[#FFCC00] px-4 py-1 text-2xl font-bold uppercase tracking-tight text-black shadow-[3px_3px_0_#000] md:text-3xl">
          Education &amp; Training
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {EDUCATION.map(
          ({ icon: Icon, title, org, period, location, detail, highlight }) => (
            <div
              key={`${org}-${title}`}
              className={`flex flex-col rounded-none border-2 border-black p-5 shadow-[3px_3px_0_#000] ${
                highlight ? "bg-black text-white" : "bg-white"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-none border-2 bg-[#FFCC00] text-black ${
                  highlight ? "border-white" : "border-black"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3
                className={`mt-4 text-base font-semibold ${
                  highlight ? "text-white" : "text-black"
                }`}
              >
                {title}
              </h3>
              <p
                className={`text-sm font-medium ${
                  highlight ? "text-[#FFCC00]" : "text-[#0000EE]"
                }`}
              >
                {org}
              </p>
              <p
                className={`mt-1 text-xs ${
                  highlight ? "text-white/60" : "text-black/60"
                }`}
              >
                {period} · {location}
              </p>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  highlight ? "text-white/70" : "text-black/70"
                }`}
              >
                {detail}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
