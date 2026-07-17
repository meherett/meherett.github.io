"use client";

import { Button } from "@/components/ui/button";
import { Terminal, Github, Mail, ArrowUpRight } from "lucide-react";

function openPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

export function Hero() {
  return (
    <section id="top" className="text-center">
      <button
        type="button"
        onClick={openPalette}
        className="mx-auto mb-6 flex w-full max-w-2xl items-center rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-left text-sm text-zinc-500 shadow-lg transition-colors hover:border-cyan-800/50 hover:text-zinc-300"
      >
        <Terminal className="mr-3 h-5 w-5 shrink-0" />
        <span>
          Type{" "}
          <span className="font-mono text-cyan-500/80">meherett --help</span> or
          press{" "}
          <kbd className="mx-1 rounded-md border border-zinc-600 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
            ⌘
          </kbd>
          /
          <kbd className="mx-1 rounded-md border border-zinc-600 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
            Ctrl
          </kbd>
          +
          <kbd className="mx-1 rounded-md border border-zinc-600 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
            M
          </kbd>{" "}
          to explore
        </span>
      </button>

      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Meheret Tesfaye Batu
      </h1>
      <p className="mt-3 text-lg font-medium text-primary md:text-xl">
        Blockchain Engineer &amp; Open-Source Architect
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        Founder of{" "}
        <a
          href="https://talonlab.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-200 underline-offset-4 hover:text-cyan-400 hover:underline"
        >
          Talon-Lab
        </a>{" "}
        and creator of{" "}
        <a
          href="https://hdwallet.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-200 underline-offset-4 hover:text-cyan-400 hover:underline"
        >
          HDWallet
        </a>
        . Specializing in the design and implementation of secure, user-centric
        cryptocurrency solutions and decentralized infrastructure.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button asChild size="lg">
          <a href="https://github.com/meherett" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" /> View GitHub
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="mailto:meherett.batu@gmail.com">
            <Mail className="mr-2 h-4 w-4" /> Contact Me
          </a>
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
        <a
          href="https://talonlab.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-cyan-400"
        >
          talonlab.org <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://hdwallet.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-cyan-400"
        >
          hdwallet.io <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
