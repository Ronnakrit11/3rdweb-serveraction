import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Pricing } from "@/components/home/pricing/pricing";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-purple-900/30 rounded-full blur-3xl" />
        </div>
      </div>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
    </main>
  );
}