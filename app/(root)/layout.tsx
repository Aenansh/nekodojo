import { ReactNode } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SignOut from "@/components/SignOut";

const layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const user = await currentUser();
  if (user && !user.username) redirect("/onboarding");

  return (
    <>
      <div className="min-h-screen bg-[#0f0b0a] relative selection:bg-[#d4af37] selection:text-[#1a110d]">
        
        {/* Header: z-[60] ensures it floats ABOVE the Dojo Doors (z-50) */}
        <header className="fixed top-0 right-0 w-full flex justify-end items-center py-6 px-6 md:px-12 gap-6 z-10 pointer-events-none">
          
          <div className="pointer-events-auto flex gap-4 items-center">
            <SignedOut>
              
              {/* === SIGN IN (Secondary) === */}
              <SignInButton>
                <button className="group relative px-6 py-2 overflow-hidden rounded-sm border border-[#d4af37]/40 text-[#d4af37] font-mono text-xs tracking-[0.2em] uppercase hover:border-[#d4af37] transition-all duration-300">
                  <span className="absolute inset-0 w-0 bg-[#d4af37]/10 transition-all duration-250 ease-out group-hover:w-full"></span>
                  <span className="relative">Sign In</span>
                </button>
              </SignInButton>

              {/* === SIGN UP (Primary) === */}
              <SignUpButton>
                <button className="relative px-8 py-2 bg-[#d4af37] text-[#1a110d] font-bold font-mono text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[#c5a028] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300">
                  Join Dojo
                </button>
              </SignUpButton>
              
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4 bg-[#1a110d]/80 backdrop-blur-md p-2 rounded-lg border border-[#3e2723]">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border border-[#d4af37]/50"
                    }
                  }}
                />
                <div className="w-px h-6 bg-[#3e2723]"></div>
                <SignOut />
              </div>
            </SignedIn>
          </div>
        </header>

        {children}
      </div>
    </>
  );
};

export default layout;