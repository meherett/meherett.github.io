import { Separator } from "@/components/ui/separator";
import { Github, Send, Mail, MapPin } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

const SOCIALS = [
  { href: "https://github.com/meherett", label: "GitHub", icon: Github },
  { href: "https://x.com/meherettbatu", label: "X", icon: XIcon },
  { href: "https://t.me/meherett", label: "Telegram", icon: Send },
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
        Copyright © {new Date().getFullYear()} Meheret T. Batu
      </p>
    </footer>
  );
}
