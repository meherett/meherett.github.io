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
};

// 1. DATA ARRAY ABSTRACTION
const CAREER_DATA = [
  {
    id: "qtum",
    company: "Qtum Foundation",
    range: "2022 – Present",
    role: "Blockchain Engineer",
    period: "06/2022 – 01/2026",
    summary: "Developed distributed ledger systems applicable to large and complex production-level environments while ensuring secure deployment.",
    projects: [
        {
        title: "Qtum-Snap",
        subtitle: "MetaMask Integration",
        description: "Currently engineering the Qtum-Snap project, building custom wallet architecture to allow seamless interaction with the Qtum blockchain directly inside the MetaMask environment.",
        links: [],
        tools: ["TypeScript", "MetaMask Snaps", "React"],
        tags: ["Wallet", "R&D"],
        screenshots: ["/png/qtum-snap/qtum-snap-installer.png"],
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
            "/png/qnode/register.png",
            "/png/qnode/total-requests-volume.png",
            "/png/qnode/top-method-request-volumes.png",
            "/png/qnode/network-request-volumes.png",
            "/png/qnode/requests-activity.png",
        ],
        colSpan: 1,
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
        title: "Qtum-Exporter",
        subtitle: "Prometheus Plugin",
        description: "Built an advanced Prometheus exporter for Qtum nodes. This monitoring tool extracts granular on-chain data and node health metrics, making it essential for node operators and enterprise deployments.",
        links: [{ url: "https://github.com/qtumproject/qtum-exporter", label: "github.com/qtumproject/qtum-exporter" }],
        tools: ["Python", "Prometheus", "Docker"],
        tags: ["Monitoring", "DevOps"],
        screenshots: [],
        colSpan: 1,
      }
    ]
  },
  {
    id: "xinfin",
    company: "XinFin Foundation",
    range: "2021 – 2022",
    role: "Blockchain Engineer",
    period: "01/2021 – 10/2022",
    summary: "Designed blockchain libraries, tools, and utilities to facilitate secure integration of distributed ledger systems into production-level networks.",
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
    company: "Bytom Blockchain",
    range: "2019 – 2021",
    role: "Blockchain Engineer",
    period: "08/2019 – 04/2021",
    summary: "Designed blockchain libraries, tools, and utilities to facilitate secure integration of distributed ledger systems into production-level networks.",
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
      <DialogContent showCloseButton={false} className="min-w-[75vw] p-0">
        <div className="relative w-full">
          <DialogTitle></DialogTitle>
          <Carousel className="w-full" opts={{ startIndex: initialIndex, loop: true }}>
                <CarouselContent>
                    {project.screenshots.map((img: string, index: number) => (
                        <CarouselItem key={index}>
                            <div className="relative w-full h-[85vh] flex items-center justify-center bg-transparent">
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
                        <CarouselPrevious className="left-4 bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white" />
                        <CarouselNext className="right-4 bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white" />
                    </>
                )}
            </Carousel>
            <DialogClose className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors">
                <X className="h-6 w-6" />
            </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 3. REUSABLE CARD COMPONENT
function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="pt-0 border-zinc-800 bg-zinc-900/40 flex flex-col h-full overflow-hidden">
      {project.screenshots && project.screenshots.length > 0 && (
        <CardHeader className="p-0 shrink-0">
          <div className="w-full overflow-hidden rounded-t-xl border-b border-zinc-800 bg-zinc-950 relative group">
            <Carousel className="w-full">
              <CarouselContent>
                {project.screenshots.map((img: string, imgIndex: number) => (
                  <CarouselItem key={imgIndex}>
                    <ProjectScreenshotsModal project={project} initialIndex={imgIndex}>
                        <div className="relative cursor-pointer group">
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
                  <CarouselPrevious className="left-2 bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white z-10" />
                  <CarouselNext className="right-2 bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white z-10" />
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
            <CardTitle className="text-lg font-semibold text-zinc-200">
              {project.title}
            </CardTitle>
            {project.subtitle && (
              <span className="text-sm font-medium text-cyan-500/80">
                {project.subtitle}
              </span>
            )}
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap justify-end gap-2 shrink-0 pt-1">
              {project.tags.map((tag: string, i: number) => (
                <Badge key={i} variant="default" className="bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 border-cyan-800/50">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-zinc-400 grow">
          {project.description}
        </p>

        {project.tools && project.tools.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {project.tools.map((tool: string, i: number) => (
              <Badge key={i} variant="outline" className="border-zinc-700 text-zinc-300">
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
                className="text-xs inline-flex items-center text-zinc-300 hover:text-cyan-400 transition-colors"
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
  return (
    <section id="career" className="w-full scroll-mt-24">
      <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight text-zinc-100">
        Career Timeline
      </h2>

      <Tabs defaultValue={CAREER_DATA[0].id} className="w-full">
        <TabsList className="grid min-h-16 w-full grid-cols-3 items-stretch bg-transparent rounded-lg p-1">
          {CAREER_DATA.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="h-full flex-col gap-0.5 py-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-cyan-400"
            >
              <span>{tab.company}</span>
              <span className="text-xs font-normal text-zinc-500">
                {tab.range}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {CAREER_DATA.map((tab) => {
          const regularProjects = tab.projects.filter(p => p.colSpan !== 2);
          const fullWidthProjects = tab.projects.filter(p => p.colSpan === 2);

          return (
            <TabsContent key={tab.id} value={tab.id} className="mt-6 space-y-6">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-zinc-100">{tab.role} ({tab.period})</h3>
                <p className="mt-2 text-zinc-400 leading-relaxed">
                  {tab.summary}
                </p>
              </div>

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
