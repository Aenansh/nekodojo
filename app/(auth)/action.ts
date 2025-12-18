"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

async function getUserFromDb(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { isOnboarded: true },
    });
    return user?.isOnboarded ?? false; 
  } catch (error) {
    console.error("Couldn't fetch the user", error);
    return false;
  }
}

export async function getIsOnboarded() {
  const user = await currentUser();
  
  if (!user || !user.emailAddresses?.[0]) {
    return false;
  }

  return await getUserFromDb(user.emailAddresses[0].emailAddress);
}