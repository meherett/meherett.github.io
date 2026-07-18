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
      <h2 className="mb-8 text-center">
        <span className="inline-block border-2 border-black bg-[#FFCC00] px-4 py-1 text-2xl font-bold uppercase tracking-tight text-black shadow-[3px_3px_0_#000] md:text-3xl">
          Awards &amp; Recognition
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {AWARDS.map(({ icon: Icon, title, org, year, detail, highlight }) => (
          <div
            key={title}
            className={`flex gap-4 rounded-none border-2 border-black p-5 shadow-[3px_3px_0_#000] ${
              highlight ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-none border-2 ${
                highlight
                  ? "border-white bg-[#EE0000] text-white"
                  : "border-black bg-[#FFCC00] text-black"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3
                  className={`text-sm font-semibold leading-snug ${
                    highlight ? "text-white" : "text-black"
                  }`}
                >
                  {title}
                </h3>
                <span
                  className={`shrink-0 text-xs ${
                    highlight ? "text-white/60" : "text-black/60"
                  }`}
                >
                  {year}
                </span>
              </div>
              <p
                className={`text-xs font-medium ${
                  highlight ? "text-[#FFCC00]" : "text-black/60"
                }`}
              >
                {org}
              </p>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  highlight ? "text-white/70" : "text-black/60"
                }`}
              >
                {detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-16 mb-8 text-center">
        <span className="inline-block border-2 border-black bg-[#FFCC00] px-4 py-1 text-2xl font-bold uppercase tracking-tight text-black shadow-[3px_3px_0_#000] md:text-3xl">
          Interview
        </span>
      </h2>
      <a
        href="https://medium.com/bytomofficial/interview-with-meheret-one-of-the-developers-from-bytom-community-80f9f181c09?source=social.tw"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-4 rounded-none border-2 border-black bg-white px-5 py-4 shadow-[3px_3px_0_#000] transition-colors hover:bg-[#FFCC00]"
      >
        <div>
          <p className="text-sm font-medium text-black">
            Featured interview with Bytom Blockchain Official
          </p>
          <p className="text-xs text-black/60">Medium · February 20, 2021</p>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-black" />
      </a>
    </section>
  );
}
