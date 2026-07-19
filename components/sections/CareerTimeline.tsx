"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkIcon, Maximize2, X } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { RetroSelect } from "@/components/RetroSelect";
type ProjectLink = { url: string; label: string };
type Project = {
  title: string;
  subtitle: string;
  description: string;
  links: ProjectLink[];
  tools: string[];
  tags: string[];
  screenshots: string[];
  colSpan: number;
  highlight?: boolean;
};

// 1. DATA ARRAY ABSTRACTION
const CAREER_DATA = [
  {
    id: "qtum",
    company: "Qtum (QTUM) Blockchain",
    logo: "/svg/chains/qtum.svg",
    range: "2022 – Present",
    role: "Blockchain Engineer",
    period: "06/2022 – 01/2026",
    summary: (
      <>
        <a
          href="https://qtum.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0000EE] underline visited:text-[#551A8B] hover:bg-[#FFCC00]"
        >
          Qtum
        </a>{" "}
        is an open-source proof-of-stake blockchain that combines
        Bitcoin&apos;s battle-tested UTXO model with the Ethereum Virtual
        Machine through its Account Abstraction Layer — bringing EVM smart
        contracts to a UTXO base. As a Blockchain Engineer, I develop
        distributed ledger systems for large, complex production-level
        environments — from wallet tooling and node infrastructure to
        core-protocol testing — while ensuring secure deployment.
      </>
    ),
    projects: [
        {
        title: "Qtum-Snap",
        subtitle: "MetaMask Integration",
        description: "Main-maintainer of the Qtum-Snap project, working in depth with MetaMask — building custom wallet architecture that enables seamless interaction with the Qtum blockchain directly inside the MetaMask environment.",
        links: [
            { url: "https://snaps.metamask.io/snap/npm/qtumproject/qtum-wallet", label: "snaps.metamask.io/qtum-wallet" },
            { url: "https://github.com/qtumproject/qtum-extension-wallet", label: "github.com/qtumproject/qtum-extension-wallet" },
            { url: "https://qtum-snap.meherett.com", label: "qtum-snap.meherett.com" }
        ],
        tools: ["TypeScript", "MetaMask Snaps", "React"],
        tags: ["Wallet", "R&D"],
        screenshots: ["/png/qtum-snap/qtum-snap-installer.png"],
        colSpan: 1,
        highlight: true,
      },
      {
        title: "Qtum Core",
        subtitle: "Testing",
        description: "Core contributor responsible for writing, executing, and maintaining robust Python test codes to ensure the stability and security of the primary Qtum Core Wallet.",
        links: [{ url: "https://github.com/qtumproject/qtum", label: "github.com/qtumproject/qtum" }],
        tools: ["Python", "PyTest", "C++ Core"],
        tags: ["Core Protocol"],
        screenshots: [],
        colSpan: 1,
      },
      {
        title: "Qtum-BIP38",
        subtitle: "Private Key / Wallet Import Format (WIF) Protection",
        description: "A Python library implementing the BIP38 standard for the Qtum protocol, ensuring robust private key and WIF (Wallet Import Format) encryption and decryption.",
        links: [
            { url: "https://github.com/qtumproject/qtum-bip38", label: "github.com/qtumproject/qtum-bip38" }
        ],
        tools: ["Python", "Cryptography"],
        tags: ["Security"],
        screenshots: [],
        colSpan: 1,
      },
      {
        title: "Qnode",
        subtitle: "Infrastructure-as-a-Service",
        description: "Creator and main-maintainer of a decentralized platform providing reliable, secure, and scalable access to Qtum. Enables developers to build applications without managing node or server complexities.",
        links: [{ url: "https://qnode.qtum.info", label: "qnode.qtum.info" }],
        tools: ["Python", "Docker", "Linux"],
        tags: ["Infrastructure", "IaaS"],
        screenshots: [
            "/png/qnode/top-method-request-volumes.png",
            "/png/qnode/network-request-volumes.png",
            "/png/qnode/total-requests-volume.png"
        ],
        colSpan: 1,
        highlight: true,
      },
      {
        title: "Qtum-Exporter",
        subtitle: "Prometheus Plugin",
        description: "Built an advanced Prometheus exporter for Qtum nodes. This monitoring tool extracts granular on-chain data and node health metrics, making it essential for node operators and enterprise deployments.",
        links: [{ url: "https://github.com/qtumproject/qtum-exporter", label: "github.com/qtumproject/qtum-exporter" }],
        tools: ["Python", "Prometheus", "Docker"],
        tags: ["Monitoring", "DevOps"],
        screenshots: [],
        colSpan: 1,
      },
      {
        title: "Qtum-OB",
        subtitle: "Orphan Blocks Finder",
        description: "A diagnostic tool that scans Qtum Core debug files to detect and extract orphan blocks, helping node operators analyze chain reorganizations and block propagation health.",
        links: [{ url: "https://github.com/meherett/qtum-ob", label: "github.com/meherett/qtum-ob" }],
        tools: ["Python", "Qtum Core"],
        tags: ["Diagnostics", "Tooling"],
        screenshots: [],
        colSpan: 1,
      }
    ]
  },
  {
    id: "xinfin",
    company: "XinFin (XDC) Blockchain",
    logo: "/svg/chains/xinfin.svg",
    range: "2021 – 2022",
    role: "Blockchain Engineer",
    period: "01/2021 – 10/2022",
    summary: (
      <>
        <a
          href="https://xinfin.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0000EE] underline visited:text-[#551A8B] hover:bg-[#FFCC00]"
        >
          XinFin
        </a>{" "}
        is the Singapore-based organization behind the XDC Network — an
        enterprise-grade, EVM-compatible blockchain running delegated
        proof-of-stake (XDPoS) with near-zero fees, built for trade finance
        and real-world asset tokenization. As a Blockchain Engineer, I
        designed blockchain libraries, tools, and utilities that let
        developers integrate the XDC protocol securely into production-level
        networks.
      </>
    ),
    projects: [
      {
        title: "PyXDC",
        subtitle: "Developer Tool",
        description: "Developed the primary Python implementation for the XinFin XDC.Network protocol, building tools and utilities for the blockchain ecosystem.",
        links: [{ url: "https://github.com/talonlab/pyxdc", label: "github.com/talonlab/pyxdc" }],
        tools: ["Python", "XDC Protocol"],
        tags: ["Open-Source", "Library"],
        screenshots: [],
        colSpan: 1,
        highlight: true,
      },
      {
        title: "Atomic-Swap Integration",
        subtitle: "Cross-Chain Protocol",
        description: "Expanded the Swap library by adding XinFin native XDC coin and XRC20 token protocols, alongside Ethereum native ETH coin and ERC20 token protocols.",
        links: [{ url: "https://github.com/movnetwork/swap", label: "github.com/movnetwork/swap" }],
        tools: ["Python", "Solidity", "HTLCs"],
        tags: ["Cross-Chain", "Smart Contracts"],
        screenshots: [],
        colSpan: 1,
      }
    ]
  },
  {
    id: "bytom",
    company: "Bytom (BTM) Blockchain",
    logo: "/svg/chains/bytom.svg",
    range: "2019 – 2021",
    role: "Blockchain Engineer",
    period: "08/2019 – 04/2021",
    summary: (
      <>
        <a
          href="https://bytom.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0000EE] underline visited:text-[#551A8B] hover:bg-[#FFCC00]"
        >
          Bytom
        </a>{" "}
        is a public blockchain protocol for registering and managing byte
        assets — digitized real-world and native digital assets — on-chain,
        paired with its high-throughput Vapor sidechain. As a Blockchain
        Engineer, I designed the ecosystem&apos;s developer-facing libraries,
        tools, and utilities, from cross-chain atomic swaps to protocol SDKs,
        enabling secure integration of Bytom&apos;s mainchain and sidechain
        into production-level networks.
      </>
    ),
    projects: [
      {
        title: "Atomic-Swap Project",
        subtitle: "Cross-Chain Library",
        description: "Creator and main-maintainer of a Python library for Cross-chain atomic swaps based on Hash Time Lock Contracts (HTLCs). Integrated Bytom mainchain, Vapor sidechain, and Bitcoin.",
        links: [{ url: "https://github.com/movnetwork/swap", label: "github.com/movnetwork/swap" }],
        tools: ["Python", "Cryptography", "HTLCs"],
        tags: ["Cross-Chain"],
        screenshots: [],
        colSpan: 1,
        highlight: true,
      },
      {
        title: "PyBytom",
        subtitle: "Developer Tool",
        description: "Developed a comprehensive Python library with tools for Bytom mainchain and sidechain protocols. Won a $5,000 award in the 2019 Bytom dev competition.",
        links: [{ url: "https://github.com/talonlab/pybytom", label: "github.com/talonlab/pybytom" }],
        tools: ["Python", "Bytom API"],
        tags: ["Award-Winning", "Library"],
        screenshots: [],
        colSpan: 1,
        highlight: true,
      },
      {
        title: "Py-Equity",
        subtitle: "Compiler Wrapper",
        description: "A Python wrapper around the BUTXO Equity compiler for the Bytom classic (v1.0) protocol, enabling smart contract language compilation directly using Python.",
        links: [{ url: "https://github.com/movnetwork/py-equity", label: "github.com/movnetwork/py-equity" }],
        tools: ["Python", "Compilers", "Equity"],
        tags: ["Smart Contracts"],
        screenshots: [],
        colSpan: 1,
      }
    ]
  }
];

// 2. NEW MODAL COMPONENT
function ProjectScreenshotsModal({ project, initialIndex, children }: { project: Project, initialIndex: number, children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="min-w-[75vw] rounded-none border-2 border-black bg-white p-0 shadow-[3px_3px_0_#000]">
        <div className="relative w-full">
          <DialogTitle className="sr-only">
            {project.title} screenshots
          </DialogTitle>
          <Carousel className="w-full" opts={{ startIndex: initialIndex, loop: true }}>
                <CarouselContent>
                    {project.screenshots.map((img: string, index: number) => (
                        <CarouselItem key={index}>
                            <div className="relative w-full h-[85vh] flex items-center justify-center bg-white">
                                <Image
                                    src={img}
                                    alt={`${project.title} Screenshot ${index + 1}`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {project.screenshots.length > 1 && (
                    <>
                        <CarouselPrevious className="left-4 rounded-none border-2 border-black bg-white text-black hover:bg-[#FFCC00] hover:text-black" />
                        <CarouselNext className="right-4 rounded-none border-2 border-black bg-white text-black hover:bg-[#FFCC00] hover:text-black" />
                    </>
                )}
            </Carousel>
            <DialogClose className="absolute top-4 right-4 z-50 rounded-none border-2 border-black bg-white p-2 text-black shadow-[2px_2px_0_#000] transition-colors hover:bg-[#EE0000] hover:text-white">
                <X className="h-6 w-6" />
            </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 3. REUSABLE CARD COMPONENT
function ProjectCard({ project }: { project: Project }) {
  const dark = Boolean(project.highlight);

  return (
    <Card
      className={`pt-0 rounded-none border-2 border-black shadow-[3px_3px_0_#000] flex flex-col h-full overflow-hidden ${
        dark ? "bg-black text-white" : "bg-white"
      }`}
    >
      {project.screenshots && project.screenshots.length > 0 && (
        <CardHeader className="p-0 shrink-0">
          <div
            className={`w-full rounded-none border-b-2 relative group p-3 ${
              dark ? "border-white bg-black" : "border-black bg-white"
            }`}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {project.screenshots.map((img: string, imgIndex: number) => (
                  <CarouselItem key={imgIndex}>
                    <ProjectScreenshotsModal project={project} initialIndex={imgIndex}>
                        <div
                          className={`relative cursor-pointer group overflow-hidden border-2 ${
                            dark
                              ? "border-white shadow-[2px_2px_0_#fff]"
                              : "border-black shadow-[2px_2px_0_#000]"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${project.title} Screenshot ${imgIndex + 1}`}
                            width={1280}
                            height={720}
                            className="w-full h-auto block transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 drop-shadow-lg" />
                          </div>
                        </div>
                    </ProjectScreenshotsModal>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {project.screenshots.length > 1 && (
                <>
                  <CarouselPrevious className="left-2 rounded-none border-2 border-black bg-white text-black hover:bg-[#FFCC00] hover:text-black z-10" />
                  <CarouselNext className="right-2 rounded-none border-2 border-black bg-white text-black hover:bg-[#FFCC00] hover:text-black z-10" />
                </>
              )}
            </Carousel>
          </div>
        </CardHeader>
      )}

      <CardContent className={`px-6 flex flex-col grow ${!project.screenshots || project.screenshots.length === 0 ? 'pt-6' : ''}`}>

        {/* UPDATED TITLE & SUBTITLE SECTION */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle
              className={`text-lg font-semibold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              {project.title}
            </CardTitle>
            {project.subtitle && (
              <span
                className={`text-sm font-medium ${
                  dark ? "text-[#FFCC00]" : "text-[#0000EE]"
                }`}
              >
                {project.subtitle}
              </span>
            )}
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex min-w-0 flex-wrap justify-end gap-2 pt-1">
              {project.tags.map((tag: string, i: number) => (
                <Badge key={i} variant="default" className="rounded-none border border-black bg-[#FFCC00] px-1.5 text-black shadow-none">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <p
          className={`mt-4 text-sm grow ${
            dark ? "text-white/60" : "text-black/60"
          }`}
        >
          {project.description}
        </p>

        {project.tools && project.tools.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {project.tools.map((tool: string, i: number) => (
              <Badge
                key={i}
                variant="outline"
                className={`rounded-none border px-1.5 shadow-none ${
                  dark
                    ? "border-white bg-black text-white"
                    : "border-black bg-white text-black"
                }`}
              >
                {tool}
              </Badge>
            ))}
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="pt-4 flex flex-col space-y-2">
            {project.links.map((link: ProjectLink, i: number) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs inline-flex items-center underline hover:bg-[#FFCC00] hover:text-black ${
                  dark
                    ? "text-[#FFCC00]"
                    : "text-[#0000EE] visited:text-[#551A8B]"
                }`}
              >
                <LinkIcon className="mr-2 h-3 w-3" /> {link.label}
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 4. MAIN TIMELINE COMPONENT
export function CareerTimeline() {
  const [activeCompany, setActiveCompany] = useState(CAREER_DATA[0].id);

  return (
    <section id="career" className="w-full scroll-mt-24">
      <h2 className="mb-8 text-center">
        <span className="inline-block border-2 border-black bg-[#FFCC00] px-4 py-1 text-2xl font-bold uppercase tracking-tight text-black shadow-[3px_3px_0_#000] md:text-3xl">
          Career Timeline
        </span>
      </h2>

      <Tabs value={activeCompany} onValueChange={setActiveCompany} className="w-full">
        <div className="mb-2 md:hidden">
          <RetroSelect
            value={activeCompany}
            onChange={setActiveCompany}
            ariaLabel="Select company"
            options={CAREER_DATA.map((tab) => ({
              value: tab.id,
              label: `${tab.company.replace(/\s*\([A-Z]+\)/, "")} (${tab.range})`,
            }))}
          />
        </div>

        <TabsList className="hidden min-h-28 w-full grid-cols-3 items-stretch gap-2 bg-transparent p-0 md:grid">
          {CAREER_DATA.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="group h-full flex-col gap-1 py-2.5 rounded-none border-2 border-black bg-[#C0C0C0] text-black shadow-[2px_2px_0_#000] transition-colors hover:bg-[#FFCC00] data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:hover:bg-black"
            >
              <Image
                src={tab.logo}
                alt=""
                aria-hidden
                width={40}
                height={40}
                className="hidden h-10 w-10 shrink-0 group-data-[state=active]:invert md:block"
              />
              <span>{tab.company}</span>
              <span className="text-xs font-normal text-black/60 group-data-[state=active]:text-white/60">
                {tab.range}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {CAREER_DATA.map((tab) => {
          const regularProjects = tab.projects.filter(p => p.colSpan !== 2);
          const fullWidthProjects = tab.projects.filter(p => p.colSpan === 2);

          return (
            <TabsContent key={tab.id} value={tab.id} className="mt-3 space-y-6">
              <p className="text-black/70 leading-relaxed">
                {tab.summary}
              </p>

              <div className="columns-1 md:columns-2 gap-6">
                {regularProjects.map((project, index) => (
                  <div key={index} className="break-inside-avoid mb-6">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>

              {fullWidthProjects.length > 0 && (
                <div className="grid grid-cols-1 gap-6 mt-6">
                  {fullWidthProjects.map((project, index) => (
                    <ProjectCard key={`full-${index}`} project={project} />
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
