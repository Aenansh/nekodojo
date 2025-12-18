"use client";

import LandingPage from "@/components/LandingPage";
import dynamic from "next/dynamic";

const AboutHero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#0f0b0a]" />,
});

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-x-hidden font-sans bg-[#0f0b0a] text-[#eaddcf]">
        <LandingPage />
        <AboutHero />
      </div>
    </>
  );
}
