"use client";

import { useEffect, useState, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Briefcase,
  KeyRound,
  Boxes,
  Code2,
  GraduationCap,
  Trophy,
  Github,
  Globe,
  Mail,
  FlaskConical,
} from "lucide-react";

const SECTIONS = [
  { id: "hdwallet", label: "HDWallet (Flagship)", icon: KeyRound },
  { id: "career", label: "Career Timeline", icon: Briefcase },
  { id: "projects", label: "Personal Projects", icon: Boxes },
  { id: "skills", label: "Technical Arsenal", icon: Code2 },
  { id: "education", label: "Education & Training", icon: GraduationCap },
  { id: "recognition", label: "Awards & Recognition", icon: Trophy },
];

const LINKS = [
  { href: "https://github.com/meherett", label: "GitHub (@meherett)", icon: Github },
  { href: "https://hdwallet.io", label: "HDWallet.io", icon: Globe },
  { href: "https://talonlab.org", label: "Talon-Lab", icon: FlaskConical },
  { href: "mailto:meherett.batu@gmail.com", label: "Email me", icon: Mail },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onOpen = () => setOpen(true);

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  const goTo = useCallback((id: string) => {
    setOpen(false);
    // Allow the dialog close animation to start before scrolling.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const openLink = useCallback((href: string) => {
    setOpen(false);
    if (href.startsWith("mailto:")) {
      window.location.href = href;
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="rounded-none border-2 border-black shadow-[6px_6px_0_#000]"
    >
      <CommandInput placeholder="Jump to a section or open a link..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <CommandItem key={id} value={label} onSelect={() => goTo(id)}>
              <Icon />
              <span>{label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <CommandItem key={href} value={label} onSelect={() => openLink(href)}>
              <Icon />
              <span>{label}</span>
              <CommandShortcut>↗</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
