import type { ElementType, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HdwalletDemo } from "@/components/HdwalletDemo";
import {
  Star,
  GitFork,
  Boxes,
  Download,
  KeyRound,
  Lock,
  Terminal,
  Github,
  Globe,
  ArrowUpRight,
  ArrowLeftRight,
  FlaskConical,
  Blocks,
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
  highlight?: boolean;
  wide?: boolean;
  description: ReactNode;
  features: string[];
  status: string;
  stats: ProjectStat[];
  links: ProjectLink[];
  demo?: ReactNode;
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
        <span className="mb-3 flex flex-wrap items-center gap-2">
          <a
            href="https://pepy.tech/projects/hdwallet"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static.pepy.tech/personalized-badge/hdwallet?period=total&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=downloads"
              alt="PyPI Downloads"
              className="h-5"
            />
          </a>
          <a
            href="https://pepy.tech/projects/hdwallet"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static.pepy.tech/personalized-badge/hdwallet?period=monthly&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=downloads%2Fmonth"
              alt="PyPI Downloads per month"
              className="h-5"
            />
          </a>
          <a
            href="https://pepy.tech/projects/hdwallet"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static.pepy.tech/personalized-badge/hdwallet?period=weekly&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=downloads%2Fweek"
              alt="PyPI Downloads per week"
              className="h-5"
            />
          </a>
        </span>
        A complete Hierarchical Deterministic (HD) Wallet generator for
        <span className="font-bold text-[#FFCC00]"> 200+ cryptocurrencies</span>, built
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
      { icon: Download, value: "3M+", label: "Downloads" },
      { icon: Star, value: "550+", label: "Stars" },
      { icon: GitFork, value: "150+", label: "Forks" },
      { icon: Boxes, value: "400+", label: "Projects using it" },
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
    ],
    demo: <HdwalletDemo />,
  },
  {
    icon: Lock,
    title: "Python-BIP38",
    subtitle: "BIP38 · Private-Key Encryption",
    highlight: true,
    wide: true,
    description: (
      <>
        <span className="mb-3 flex flex-wrap items-center gap-2">
          <a
            href="https://pepy.tech/projects/bip38"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static.pepy.tech/personalized-badge/bip38?period=total&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=downloads"
              alt="PyPI Downloads"
              className="h-5"
            />
          </a>
          <a
            href="https://pepy.tech/projects/bip38"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static.pepy.tech/personalized-badge/bip38?period=monthly&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=downloads%2Fmonth"
              alt="PyPI Downloads per month"
              className="h-5"
            />
          </a>
          <a
            href="https://pepy.tech/projects/bip38"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static.pepy.tech/personalized-badge/bip38?period=weekly&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=downloads%2Fweek"
              alt="PyPI Downloads per week"
              className="h-5"
            />
          </a>
        </span>
        Python library implementing
        <span className="font-bold text-[#FFCC00]">
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
      { icon: Download, value: "47K+", label: "Downloads" },
      { icon: Star, value: "15+", label: "Stars" },
      { icon: GitFork, value: "3+", label: "Forks" },
      { icon: Boxes, value: "10+", label: "Projects using it" },
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
        <span className="font-bold text-black"> Ethereum smart-contract</span>{" "}
        compilation, testing, and deployment on the Ethereum Virtual Machine
        (EVM).
      </>
    ),
    features: ["Python", "Solidity", "EVM", "Testing", "Deployment"],
    status: "Creator · 02/2019 – 08/2020 · Public-archived",
    stats: [
      { icon: Star, value: "50+", label: "Stars" },
      { icon: GitFork, value: "5+", label: "Forks" },
    ],
    links: [
      {
        href: "https://github.com/cobraframework/cobra",
        label: "cobraframework/cobra",
        icon: Github,
      },
    ],
  },
  {
    icon: FlaskConical,
    title: "PyTest-Solidity",
    subtitle: "PyTest Plugin · Solidity Testing",
    description: (
      <>
        A PyTest plugin for testing
        <span className="font-bold text-black"> Ethereum smart contracts</span>{" "}
        — write and run Solidity contract tests with pytest, supporting
        contracts compiled from .sol, .json, and .yaml sources.
      </>
    ),
    features: ["Python", "PyTest", "Solidity", "EVM"],
    status: "Creator & main-maintainer · 2019 · MIT",
    stats: [
      { icon: Star, value: "25+", label: "Stars" },
      { icon: GitFork, value: "6+", label: "Forks" },
    ],
    links: [
      {
        href: "https://github.com/meherett/pytest-solidity",
        label: "meherett/pytest-solidity",
        icon: Github,
      },
      {
        href: "https://pypi.org/project/pytest-cobra",
        label: "pypi.org/project/pytest-cobra",
        icon: Globe,
      },
    ],
  },
  {
    icon: ArrowLeftRight,
    title: "Atomic-Swap",
    subtitle: "Cross-Chain · HTLC Protocol",
    description: (
      <>
        Python library for
        <span className="font-bold text-black"> cross-chain atomic swaps</span>{" "}
        between the networks of two cryptocurrencies, secured by Hash Time Lock
        Contracts (HTLCs) — no trusted third party required. Supports Bitcoin,
        Ethereum &amp; ERC20, XinFin &amp; XRC20, Bytom, and Vapor.
      </>
    ),
    features: ["Python", "HTLCs", "Bitcoin", "Ethereum", "XinFin", "Bytom", "Vapor"],
    status: "Creator & main-maintainer · 2019 – present · AGPL-3.0",
    stats: [
      { icon: Star, value: "75+", label: "Stars" },
      { icon: GitFork, value: "30+", label: "Forks" },
    ],
    links: [
      {
        href: "https://github.com/movnetwork/swap",
        label: "movnetwork/swap",
        icon: Github,
      },
      {
        href: "https://swap.readthedocs.io",
        label: "swap.readthedocs.io",
        icon: Globe,
      },
    ],
  },
  {
    icon: Blocks,
    title: "Angular-CLI-Truffle-Box",
    subtitle: "Truffle Box · Angular dApp Starter",
    description: (
      <>
        A Truffle Box starter for building
        <span className="font-bold text-black"> Ethereum dApps with Angular</span>{" "}
        — write, compile, and deploy smart contracts with the Truffle
        Framework, wired to MetaMask with a working MetaCoin example.
      </>
    ),
    features: ["TypeScript", "Angular", "Truffle", "Solidity", "MetaMask"],
    status: "Creator & main-maintainer · 2018",
    stats: [
      { icon: Star, value: "8+", label: "Stars" },
      { icon: GitFork, value: "2+", label: "Forks" },
    ],
    links: [
      {
        href: "https://github.com/meherett/angular-cli-truffle-box",
        label: "meherett/angular-cli-truffle-box",
        icon: Github,
      },
    ],
  },
];

function ProjectShowcaseCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const Icon = project.icon;
  const dark = Boolean(project.flagship || project.highlight);

  return (
    <div
      id={project.id}
      className={`relative scroll-mt-24 border-2 border-black shadow-[3px_3px_0_#000] ${
        dark ? "bg-black text-white" : "bg-white"
      } ${compact ? "p-6" : "p-6 md:p-10"}`}
    >
      <div
        className={`relative flex flex-col gap-8 ${
          compact ? "" : "lg:flex-row lg:items-start lg:justify-between"
        }`}
      >
        {/* Left: identity + copy */}
        <div className={compact ? "" : "max-w-2xl"}>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-none border-2 bg-[#FFCC00] text-black ${
                dark ? "border-white" : "border-black"
              }`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3
                  className={`text-2xl font-bold tracking-tight ${
                    dark ? "text-white" : "text-black"
                  }`}
                >
                  {project.title}
                </h3>
                {project.flagship && (
                  <span className="rounded-none border-2 border-white bg-[#EE0000] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Flagship
                  </span>
                )}
              </div>
              <p
                className={`text-sm font-medium leading-snug ${
                  dark ? "text-[#FFCC00]" : "text-[#0000EE]"
                }`}
              >
                {project.subtitle}
              </p>
            </div>
          </div>

          <p
            className={`mt-5 leading-relaxed ${
              dark ? "text-white/70" : "text-black/70"
            }`}
          >
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <Badge
                key={feature}
                variant="outline"
                className={`rounded-none border px-1.5 shadow-none ${
                  dark
                    ? "border-white bg-black text-white"
                    : "border-black bg-white text-black"
                }`}
              >
                {feature}
              </Badge>
            ))}
          </div>

          <p
            className={`mt-6 text-sm ${
              dark ? "text-white/60" : "text-black/60"
            }`}
          >
            {project.status}
          </p>
        </div>

        {/* Right: stats + links */}
        <div className={`w-full shrink-0 ${compact ? "" : "lg:w-80"}`}>
          <div className="grid grid-cols-2 gap-3">
            {project.stats.map(({ icon: StatIcon, value, label }, i) => (
              <div
                key={label}
                className={`rounded-none border-2 bg-[#FFCC00] p-4 ${
                  dark ? "border-white" : "border-black"
                } ${
                  project.stats.length % 2 === 1 &&
                  i === project.stats.length - 1
                    ? "col-span-2"
                    : ""
                }`}
              >
                <StatIcon className="h-4 w-4 text-black" />
                <p className="mt-2 text-2xl font-bold text-black">{value}</p>
                <p className="text-xs text-black/70">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {project.links.map(({ href, label, icon: LinkIcon, badge }) => (
              <Button
                key={href}
                asChild
                variant="outline"
                className={`justify-between rounded-none border-2 bg-[#C0C0C0] text-black hover:bg-[#FFCC00] hover:text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                  dark
                    ? "border-white shadow-[2px_2px_0_#fff]"
                    : "border-black shadow-[2px_2px_0_#000]"
                }`}
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    {label}
                    {badge && (
                      <span className="rounded-none border border-black bg-white px-1.5 py-0.5 text-[10px] font-semibold text-black">
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

      {project.demo}
    </div>
  );
}

export function OpenSourceRepositories() {
  return (
    <section id="projects" className="scroll-mt-24">
      <h2 className="mb-2 text-center">
        <span className="inline-block border-2 border-black bg-[#FFCC00] px-4 py-1 text-2xl font-bold uppercase tracking-tight text-black shadow-[3px_3px_0_#000] md:text-3xl">
          Personal Open-Source Projects
        </span>
      </h2>
      <p className="mb-8 text-center text-sm text-black/60">
        Independent libraries built &amp; maintained under Talon-Lab
      </p>

      <div className="space-y-6">
        {PROJECTS.filter((project) => !project.flagship && project.wide).map(
          (project) => (
            <ProjectShowcaseCard key={project.title} project={project} />
          )
        )}

        <div className="columns-1 gap-6 lg:columns-2">
          {PROJECTS.filter((project) => !project.flagship && !project.wide).map(
            (project) => (
              <div key={project.title} className="mb-6 break-inside-avoid">
                <ProjectShowcaseCard project={project} compact />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export function FlagshipProject() {
  return (
    <section className="scroll-mt-24">
      <h2 className="mb-2 text-center">
        <span className="inline-block border-2 border-black bg-[#FFCC00] px-4 py-1 text-2xl font-bold uppercase tracking-tight text-black shadow-[3px_3px_0_#000] md:text-3xl">
          Flagship Project
        </span>
      </h2>
      <p className="mb-8 text-center text-sm text-black/60">
        Personal Open-Source Project
      </p>

      <div className="space-y-6">
        {PROJECTS.filter((project) => project.flagship).map((project) => (
          <ProjectShowcaseCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
