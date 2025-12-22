import { TagType } from "@/generated/prisma/client";

export interface TagConfig {
  value: TagType;
  label: string;
  style: string;
}

export const TAGS: TagConfig[] = [
  {
    value: "Discussion",
    label: "General Discussion",
    style: "bg-[#2a110c] text-[#a1887f] border-[#3e2723]",
  },
  {
    value: "Senseis_Wisdom",
    label: "Sensei's Wisdom",
    style: "bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30",
  },
  {
    value: "Guidance_Needed",
    label: "Guidance Needed",
    style: "bg-red-900/20 text-red-400 border-red-900/50",
  },
  {
    value: "Kata",
    label: "Kata / Drills",
    style: "bg-blue-900/20 text-blue-400 border-blue-900/50",
  },
  {
    value: "Ronins_Path",
    label: "Ronin's Path",
    style: "bg-emerald-900/20 text-emerald-400 border-emerald-900/50",
  },
  {
    value: "Dojo_Life",
    label: "Dojo Life",
    style: "bg-purple-900/20 text-purple-400 border-purple-900/50",
  },
  {
    value: "Showcase",
    label: "Showcase",
    style: "bg-orange-900/20 text-orange-400 border-orange-900/50",
  },

  {
    value: "Dynamic_Programming",
    label: "Dynamic Programming",
    style: "bg-[#0f0b0a] text-[#eaddcf] border-[#5d4037]",
  },
  {
    value: "Graphs_n_Trees",
    label: "Graphs & Trees",
    style: "bg-[#0f0b0a] text-[#eaddcf] border-[#5d4037]",
  },
  {
    value: "Arrays_n_Strings",
    label: "Arrays & Strings",
    style: "bg-[#0f0b0a] text-[#eaddcf] border-[#5d4037]",
  },
  {
    value: "Recursion",
    label: "Recursion",
    style: "bg-[#0f0b0a] text-[#eaddcf] border-[#5d4037]",
  },
  {
    value: "Bit_Manipulation",
    label: "Bit Manipulation",
    style: "bg-[#0f0b0a] text-[#eaddcf] border-[#5d4037]",
  },
  {
    value: "System_Design",
    label: "System Design",
    style: "bg-[#0f0b0a] text-[#eaddcf] border-[#5d4037]",
  },
  {
    value: "Math_n_Geometry",
    label: "Math & Geometry",
    style: "bg-[#0f0b0a] text-[#eaddcf] border-[#5d4037]",
  },

  {
    value: "TypeScript_JavaScript",
    label: "TS / JS",
    style: "bg-yellow-900/10 text-yellow-200 border-yellow-900/30",
  },
  {
    value: "Python",
    label: "Python",
    style: "bg-blue-900/10 text-blue-200 border-blue-900/30",
  },
  {
    value: "CPP_n_C",
    label: "C++ / C",
    style: "bg-indigo-900/10 text-indigo-200 border-indigo-900/30",
  },
  {
    value: "Java",
    label: "Java",
    style: "bg-red-900/10 text-red-200 border-red-900/30",
  },
  {
    value: "Rust",
    label: "Rust",
    style: "bg-orange-900/10 text-orange-200 border-orange-900/30",
  },
  {
    value: "SQL",
    label: "SQL",
    style: "bg-cyan-900/10 text-cyan-200 border-cyan-900/30",
  },
  {
    value: "NoSQL",
    label: "NoSQL",
    style: "bg-cyan-900/10 text-cyan-200 border-cyan-900/30",
  },
  {
    value: "Frontend",
    label: "Frontend",
    style: "bg-pink-900/10 text-pink-200 border-pink-900/30",
  },
  {
    value: "Backend",
    label: "Backend",
    style: "bg-slate-800 text-slate-300 border-slate-600",
  },

  {
    value: "Job",
    label: "Job Opportunities",
    style: "bg-emerald-950 text-emerald-300 border-emerald-800",
  },
  {
    value: "Placement",
    label: "Campus Placement",
    style: "bg-emerald-950 text-emerald-300 border-emerald-800",
  },
  {
    value: "Gate",
    label: "GATE Exam",
    style: "bg-rose-950 text-rose-300 border-rose-800",
  },
];

export const getTagConfig = (type: TagType) => {
  return TAGS.find((t) => t.value === type) || TAGS[6];
};
