"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CatSleep from "@/public/catscene.png";

export default function NotFound() {
  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0f0b0a]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 11, 10, 0.8), rgba(15, 11, 10, 0.95)), url('https://www.transparenttextures.com/patterns/wood-pattern.png')`,
          backgroundBlendMode: "hard-light",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#0f0b0a_90%)] pointer-events-none"></div>
        <div
          className="relative z-10 max-w-md w-full rounded-xl overflow-hidden flex flex-col items-center text-center
        bg-[#1a110d] bg-[url('https://www.transparenttextures.com/patterns/purty-wood.png')] bg-blend-soft-light
        border-4 border-[#3e2723]
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),inset_0_2px_10px_rgba(212,175,55,0.1)]"
        >
          <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-[#3e2723] border-2 border-[#2d1b15] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),0_1px_1px_rgba(212,175,55,0.3)]"></div>
          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#3e2723] border-2 border-[#2d1b15] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),0_1px_1px_rgba(212,175,55,0.3)]"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-[#3e2723] border-2 border-[#2d1b15] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),0_1px_1px_rgba(212,175,55,0.3)]"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#3e2723] border-2 border-[#2d1b15] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),0_1px_1px_rgba(212,175,55,0.3)]"></div>

          <div className="w-full h-5 bg-[#120c0b] border-b-2 border-[#2d1b15] relative shadow-sm">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1.5 bg-[#3e2723] rounded-full opacity-60 shadow-inner"></div>
          </div>

          <div className="p-8 space-y-8 relative z-10">
            <div className="space-y-2">
              <h1 className="text-7xl font-black text-[#d4af37] tracking-tighter select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                404
              </h1>
              <div className="inline-block border-b-2 border-[#3e2723] pb-1">
                <p className="text-[#a1887f] font-mono text-sm uppercase tracking-[0.3em] text-shadow-sm">
                  Scroll Not Found
                </p>
              </div>
            </div>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border-[3px] border-[#2d1b15] shadow-[inset_0_4px_15px_rgba(0,0,0,0.9)] bg-[#0f0b0a]">
              <Image
                src={CatSleep}
                alt="Lost in the dojo"
                fill
                className="object-cover opacity-85 hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#0f0b0a] via-transparent to-transparent opacity-70"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 mix-blend-overlay"></div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#eaddcf] drop-shadow-md">
                You have strayed from the path.
              </h2>
              <p className="text-[#8d6e63] leading-relaxed px-4 font-medium drop-shadow-sm">
                The scroll you are looking for has either been moved to the restricted archives or
                stolen by the dojo cats.
              </p>
            </div>
            <Link href="/" className="block">
              <Button className="bg-linear-to-b from-[#3e2723] to-[#2d1b15] text-[#d4af37] hover:from-[#d4af37] hover:to-[#b5952f] hover:text-[#1a110d] border-2 border-[#d4af37]/30 transition-all duration-300 cursor-pointer font-bold px-10 py-6 text-lg shadow-[0_10px_20px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] hover:-translate-y-1 group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Return to Dojo
                </span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
              </Button>
            </Link>
          </div>
          <div className="w-full h-6 bg-[#120c0b] border-t-2 border-[#2d1b15] flex justify-between px-6 items-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
            <div className="w-2 h-2 rounded-full bg-[#3e2723] border border-[#2d1b15] shadow-[0_1px_1px_rgba(212,175,55,0.2)]"></div>
            <div className="w-2 h-2 rounded-full bg-[#3e2723] border border-[#2d1b15] shadow-[0_1px_1px_rgba(212,175,55,0.2)]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
