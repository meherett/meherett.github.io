import type { ElementType, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  GitFork,
  Eye,
  Boxes,
  KeyRound,
  Lock,
  Terminal,
  Github,
  Globe,
  ArrowUpRight,
} from "lucide-react";

type ProjectStat = { icon: ElementType; value: string; label: string };
type ProjectLink = {
  href: string;
  label: string;
  icon: ElementType;
  badge?: string;
};
type Project = {
  id?: string;
  icon: ElementType;
  title: string;
  subtitle: string;
  flagship?: boolean;
  description: ReactNode;
  features: string[];
  status: string;
  stats: ProjectStat[];
  links: ProjectLink[];
};

const PROJECTS: Project[] = [
  {
    id: "hdwallet",
    icon: KeyRound,
    title: "HDWallet",
    subtitle: "Hierarchical Deterministic Wallet",
    flagship: true,
    description: (
      <>
        A complete Hierarchical Deterministic (HD) Wallet generator for
        <span className="text-zinc-200"> 200+ cryptocurrencies</span>, built
        with Python &amp; TypeScript. It handles multiple coins, multiple
        accounts, external and internal chains per account, and millions of
        addresses per chain — with secure seed creation, efficient key
        management, and standards-based compatibility with other wallets and
        services.
      </>
    ),
    features: [
      "200+ cryptocurrencies",
      "BIP32",
      "BIP39",
      "BIP44",
      "Multi-account",
      "Millions of addresses",
    ],
    status: "Creator & main-maintainer · 10/2020 – present",
    stats: [
      { icon: Star, value: "525+", label: "Stars" },
      { icon: GitFork, value: "150+", label: "Forks" },
      { icon: Boxes, value: "375+", label: "Projects using it" },
      { icon: Eye, value: "15+", label: "Watchers" },
    ],
    links: [
      {
        href: "https://github.com/hdwallet-io/python-hdwallet",
        label: "python-hdwallet",
        icon: Github,
      },
      {
        href: "https://github.com/hdwallet-io/hdwallet.js",
        label: "hdwallet.js",
        icon: Github,
        badge: "NEW",
      },
      {
        href: "https://hdwallet.io",
        label: "hdwallet.io",
        icon: Globe,
      },
      {
        href: "https://hdwallet.online",
        label: "hdwallet.online",
        icon: Globe,
      },
    ],
  },
  {
    icon: Lock,
    title: "python-bip38",
    subtitle: "BIP38 · Private-Key Encryption",
    description: (
      <>
        Python library implementing
        <span className="text-zinc-200">
          {" "}
          Bitcoin Improvement Proposal 0038 (BIP38)
        </span>{" "}
        — passphrase-protected private-key encryption and decryption. Supports
        both No-EC-multiply and EC-multiply modes.
      </>
    ),
    features: ["BIP38", "No EC-multiply", "EC-multiply", "Python", "Cryptography"],
    status: "Creator & main-maintainer · 09/2023 – present",
    stats: [
      { icon: Star, value: "15+", label: "Stars" },
      { icon: GitFork, value: "3+", label: "Forks" },
      { icon: Boxes, value: "10+", label: "Projects using it" },
      { icon: Eye, value: "2+", label: "Watchers" },
    ],
    links: [
      {
        href: "https://github.com/talonlab/python-bip38",
        label: "python-bip38",
        icon: Github,
      },
    ],
  },
  {
    icon: Terminal,
    title: "Cobra Framework",
    subtitle: "Ethereum Dev Environment",
    description: (
      <>
        A fast, flexible, and simple development-environment framework for
        <span className="text-zinc-200"> Ethereum smart-contract</span>{" "}
        compilation, testing, and deployment on the Ethereum Virtual Machine
        (EVM).
      </>
    ),
    features: ["Python", "Solidity", "EVM", "Testing", "Deployment"],
    status: "Creator · 02/2019 – 08/2020 · Public-archived",
    stats: [
      { icon: Star, value: "50+", label: "Stars" },
      { icon: GitFork, value: "5+", label: "Forks" },
      { icon: Eye, value: "4+", label: "Watchers" },
    ],
    links: [
      {
        href: "https://github.com/cobraframework/cobra",
        label: "cobraframework/cobra",
        icon: Github,
      },
    ],
  },
];

function ProjectShowcaseCard({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <div
      id={project.id}
      className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm md:p-10"
    >
      {project.flagship && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
        />
      )}

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left: identity + copy */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-800/50 bg-cyan-900/20 text-cyan-400">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-2xl font-bold tracking-tight text-zinc-100">
                  {project.title}
                </h3>
                {project.flagship && (
                  <span className="rounded-full border border-cyan-800/50 bg-cyan-900/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                    Flagship
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-cyan-500/80">
                {project.subtitle}
              </p>
            </div>
          </div>

          <p className="mt-5 leading-relaxed text-zinc-400">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <Badge
                key={feature}
                variant="outline"
                className="border-zinc-700 text-zinc-300"
              >
                {feature}
              </Badge>
            ))}
          </div>

          <p className="mt-6 text-sm text-zinc-500">{project.status}</p>
        </div>

        {/* Right: stats + links */}
        <div className="w-full shrink-0 lg:w-80">
          <div className="grid grid-cols-2 gap-3">
            {project.stats.map(({ icon: StatIcon, value, label }, i) => (
              <div
                key={label}
                className={`rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 ${
                  project.stats.length % 2 === 1 &&
                  i === project.stats.length - 1
                    ? "col-span-2"
                    : ""
                }`}
              >
                <StatIcon className="h-4 w-4 text-cyan-400" />
                <p className="mt-2 text-2xl font-bold text-zinc-100">{value}</p>
                <p className="text-xs text-zinc-500">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {project.links.map(({ href, label, icon: LinkIcon, badge }) => (
              <Button
                key={href}
                asChild
                variant="outline"
                className="justify-between border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-cyan-800/50 hover:text-cyan-400"
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    {label}
                    {badge && (
                      <span className="rounded-full bg-cyan-900/40 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-400">
                        {badge}
                      </span>
                    )}
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-60" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OpenSourceRepositories() {
  return (
    <section id="projects" className="scroll-mt-24">
      <h2 className="mb-2 text-center text-3xl font-semibold tracking-tight text-zinc-100">
        Personal Open-Source Projects
      </h2>
      <p className="mb-8 text-center text-sm text-zinc-500">
        Independent libraries built &amp; maintained under Talon-Lab
      </p>

      <div className="space-y-6">
        {PROJECTS.map((project) => (
          <ProjectShowcaseCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
