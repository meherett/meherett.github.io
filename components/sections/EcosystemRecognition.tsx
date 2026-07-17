import { Trophy, Award, Medal, ShieldCheck, ArrowUpRight } from "lucide-react";

const AWARDS = [
  {
    icon: Trophy,
    title: "$5,000 Prize — Bytom Dev Competition",
    org: "Bytom Blockchain",
    year: "2019",
    detail:
      "Awarded $5,000 worth of BTM coin in recognition of the PyBytom developer library.",
    highlight: true,
  },
  {
    icon: Award,
    title: "Best of African Talent",
    org: "Gebeya Inc",
    year: "2018",
    detail:
      "Recognized on completion of Front-End & Back-End Engineering programs.",
    highlight: false,
  },
  {
    icon: Medal,
    title: "ICT Cryptography Contest — 2nd Place",
    org: "Addis Ababa Communication & IT Agency",
    year: "2016",
    detail:
      "Ranked 2nd in the cryptography category at the 3rd ICT conference & exhibition, higher-learning-institution division.",
    highlight: false,
  },
  {
    icon: ShieldCheck,
    title: "Certificate of Appreciation",
    org: "Ethiopian Ministry of Communication & IT (MCIT)",
    year: "2016",
    detail:
      "For participation in the 9th ICT Exhibition, Bazaar & Conference innovative-ideas competition.",
    highlight: false,
  },
];

export function EcosystemRecognition() {
  return (
    <section id="recognition" className="scroll-mt-24">
      <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight text-zinc-100">
        Awards &amp; Recognition
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {AWARDS.map(({ icon: Icon, title, org, year, detail, highlight }) => (
          <div
            key={title}
            className={`flex gap-4 rounded-xl border p-5 backdrop-blur-sm ${
              highlight
                ? "border-cyan-800/50 bg-cyan-900/10"
                : "border-zinc-800 bg-zinc-900/40"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                highlight
                  ? "border-cyan-700/50 bg-cyan-900/30 text-cyan-300"
                  : "border-zinc-700 bg-zinc-800/50 text-zinc-300"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold leading-snug text-zinc-100">
                  {title}
                </h3>
                <span className="shrink-0 text-xs text-zinc-500">{year}</span>
              </div>
              <p className="text-xs font-medium text-cyan-500/80">{org}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-16 mb-8 text-center text-3xl font-semibold tracking-tight text-zinc-100">
        Interview
      </h2>
      <a
        href="https://medium.com/bytomofficial/interview-with-meheret-one-of-the-developers-from-bytom-community-80f9f181c09?source=social.tw"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 transition-colors hover:border-cyan-800/50"
      >
        <div>
          <p className="text-sm font-medium text-zinc-200">
            Featured interview with Bytom Blockchain Official
          </p>
          <p className="text-xs text-zinc-500">Medium · February 20, 2021</p>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-500 transition-colors group-hover:text-cyan-400" />
      </a>
    </section>
  );
}
