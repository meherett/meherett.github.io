import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meheret Tesfaye Batu - Blockchain Engineer",
  description: "Founder of Talon-Lab. Specializing in secure, user-centric cryptocurrency solutions and decentralized infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#C0C0C0] text-black antialiased">
        {children}
      </body>
    </html>
  );
}
