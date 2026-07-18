import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Mail, MapPin } from "lucide-react";

const SOCIALS = [
  { href: "https://github.com/meherett", label: "GitHub", icon: Github },
  { href: "https://x.com/meherett", label: "X", icon: Twitter },
  { href: "mailto:meherett.batu@gmail.com", label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer id="contact" className="w-full scroll-mt-24">
      <Separator className="h-[2px] bg-black" />
      <div className="flex flex-col items-center justify-between gap-6 pt-6 text-sm text-black/70 sm:flex-row">
        <div className="flex items-start gap-2 text-center sm:text-left">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Dubai, United Arab Emirates
            <br />
            Addis Ababa, Ethiopia
          </p>
        </div>

        <div className="flex items-center gap-2">
          {SOCIALS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-none border-2 border-black bg-[#C0C0C0] text-black shadow-[2px_2px_0_#000] transition-colors hover:bg-[#FFCC00]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <p className="pt-6 text-center text-xs text-black/50">
        Copyright © 2026 Meheret T. Batu
      </p>
    </footer>
  );
}
