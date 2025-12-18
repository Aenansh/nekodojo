import Onboarding from "@/components/Onboarding";
import { getUserData } from "./action";

export default async function OnboardingPage() {
  const data = await getUserData();
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0f0b0a] font-sans text-[#eaddcf] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#120c0a]">
        <div className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] bg-[radial-gradient(circle_at_center,rgba(62,39,35,0.2)_0%,rgba(10,5,3,1)_60%)] pointer-events-none"></div>
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 40%, rgba(0,0,0,1) 100%)`,
            backgroundSize: "60px 100%",
          }}
        >
        </div>
      </div>
          <Onboarding initialData={data} />
    </div>
  );
}
