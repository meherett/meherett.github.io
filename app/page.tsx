import { Hero } from "@/components/sections/Hero";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { OpenSourceRepositories, FlagshipProject } from "@/components/sections/OpenSourceRepositories";
import { TechnicalArsenal } from "@/components/sections/TechnicalArsenal";
import { Education } from "@/components/sections/Education";
import { EcosystemRecognition } from "@/components/sections/EcosystemRecognition";
import { Footer } from "@/components/sections/Footer";
import { CommandPalette } from "@/components/CommandPalette";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-[#C0C0C0] p-3 text-black md:p-6">
      <div className="w-full max-w-5xl border-[10px] border-[#0000EE] bg-white">
        <div className="w-full space-y-16 p-4 md:space-y-20 md:p-8">
          <Hero />
          <FlagshipProject />
          <CareerTimeline />
          <OpenSourceRepositories />
          <TechnicalArsenal />
          <Education />
          <EcosystemRecognition />
          <Footer />
        </div>
      </div>
      <CommandPalette />
    </main>
  );
}
