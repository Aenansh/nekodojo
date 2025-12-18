import { getIsOnboarded } from "./action"; // Import the function we fixed previously
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isOnboarded = await getIsOnboarded();

  // 3. Handle Logic
  // If the user is already onboarded, kick them to the dashboard/home
  if (isOnboarded) {
    redirect("/");
  }

  // 4. Render
  return (
    <div data-theme="luxury" className="min-h-screen min-w-full">
      {children}
    </div>
  );
}