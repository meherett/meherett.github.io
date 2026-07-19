"use client";

import { Button } from "@/components/ui/button";
import { Terminal, Github, Mail, Send } from "lucide-react";

function openPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

export function Hero() {
  return (
    <section id="top" className="text-center">
      <button
        type="button"
        onClick={openPalette}
        className="mx-auto mb-6 flex w-full max-w-2xl items-center rounded-none border-2 border-black bg-[#C0C0C0] px-4 py-3 text-left text-sm text-black shadow-[2px_2px_0_#000] transition-colors hover:bg-[#FFCC00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <Terminal className="mr-3 h-5 w-5 shrink-0 text-black" />
        <span>
          Type{" "}
          <span className="font-mono text-[#0000EE]">meherett --help</span> or
          press{" "}
          <kbd className="mx-1 rounded-none border-2 border-t-white border-l-white border-r-[#5a5a5a] border-b-[#5a5a5a] bg-[#C0C0C0] px-1.5 py-0.5 text-xs text-black">
            ⌘
          </kbd>
          /
          <kbd className="mx-1 rounded-none border-2 border-t-white border-l-white border-r-[#5a5a5a] border-b-[#5a5a5a] bg-[#C0C0C0] px-1.5 py-0.5 text-xs text-black">
            Ctrl
          </kbd>
          +
          <kbd className="mx-1 rounded-none border-2 border-t-white border-l-white border-r-[#5a5a5a] border-b-[#5a5a5a] bg-[#C0C0C0] px-1.5 py-0.5 text-xs text-black">
            M
          </kbd>{" "}
          to explore
        </span>
      </button>

      <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
        Meheret Tesfaye Batu
      </h1>
      <p className="mt-3 text-lg font-medium text-black md:text-xl">
        Blockchain Engineer &amp; Open-Source Architect
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-black/60">
        Founder of{" "}
        <a
          href="https://talonlab.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0000EE] underline visited:text-[#551A8B] hover:bg-[#FFCC00]"
        >
          Talon-Lab
        </a>{" "}
        and creator of{" "}
        <a
          href="https://hdwallet.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0000EE] underline visited:text-[#551A8B] hover:bg-[#FFCC00]"
        >
          HDWallet
        </a>
        . Specializing in the design and implementation of secure, user-centric
        cryptocurrency solutions and decentralized infrastructure.
      </p>

      <div className="mt-8 flex flex-row items-center justify-center gap-4">
        <Button
          asChild
          size="lg"
          className="rounded-none border-2 border-black bg-[#FFCC00] text-black shadow-[2px_2px_0_#000] hover:bg-black hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none max-sm:px-4"
        >
          <a
            href="https://github.com/meherett"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub"
          >
            <Github className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">View GitHub</span>
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-none border-2 border-black bg-[#C0C0C0] text-black shadow-[2px_2px_0_#000] hover:bg-[#FFCC00] hover:text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none max-sm:px-4"
        >
          <a
            href="https://t.me/meherett"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <Send className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Telegram</span>
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-none border-2 border-black bg-[#C0C0C0] text-black shadow-[2px_2px_0_#000] hover:bg-[#FFCC00] hover:text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none max-sm:px-4"
        >
          <a href="mailto:meherett.batu@gmail.com" aria-label="Contact Me">
            <Mail className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Contact Me</span>
          </a>
        </Button>
      </div>

    </section>
  );
}
