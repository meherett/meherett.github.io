import { Hero } from "@/components/sections/Hero";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { OpenSourceRepositories } from "@/components/sections/OpenSourceRepositories";
import { TechnicalArsenal } from "@/components/sections/TechnicalArsenal";
import { Education } from "@/components/sections/Education";
import { EcosystemRecognition } from "@/components/sections/EcosystemRecognition";
import { Footer } from "@/components/sections/Footer";
import { CommandPalette } from "@/components/CommandPalette";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-zinc-950 p-4 pt-12 text-zinc-200 md:p-8 md:pt-16">
      <div className="w-full max-w-5xl space-y-16 md:space-y-20">
        <Hero />
        <CareerTimeline />
        <OpenSourceRepositories />
        <TechnicalArsenal />
        <Education />
        <EcosystemRecognition />
        <Footer />
      </div>
      <CommandPalette />
    </main>
  );
}
