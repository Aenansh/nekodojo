"use client";

import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex justify-center py-10 min-h-screen bg-[#0f0b0a]">
      <UserProfile 
        appearance={{
          variables: {
            colorBackground: "#1a110d",
            colorText: "#eaddcf",
            colorPrimary: "#d4af37",
            colorTextSecondary: "#a1887f",
            fontFamily: "inherit",
          },
          elements: {
            card: "border border-[#5d4037] shadow-xl",
            navbarButton: "text-[#a1887f] hover:text-[#d4af37]",
            headerTitle: "text-[#d4af37]",
            headerSubtitle: "text-[#a1887f]",
          }
        }}
      />
    </div>
  );
}