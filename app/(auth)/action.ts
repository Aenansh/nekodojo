"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// 1. Keep this helper function, but handle the return type strictly
async function getUserFromDb(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { isOnboarded: true }, // Select only what you need
    });
    
    // Return false if user not found, otherwise return the status
    return user?.isOnboarded ?? false; 
  } catch (error) {
    console.error("Couldn't fetch the user", error);
    return false; // Fail safe to false
  }
}

// 2. Export a FUNCTION, not a constant
export async function getIsOnboarded() {
  const user = await currentUser();
  
  if (!user || !user.emailAddresses?.[0]) {
    return false;
  }

  return await getUserFromDb(user.emailAddresses[0].emailAddress);
}