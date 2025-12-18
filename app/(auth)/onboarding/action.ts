"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface UpdateUserData {
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
}

export async function updateUser(data: UpdateUserData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // 1. Update User in Database
    // Ensure 'bio' exists in your schema.prisma: `bio String?`
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio, 
        isOnboarded: true,
      },
    });

    // 2. Revalidate to ensure UI shows fresh data
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { success: false, error: "Failed to update user profile" };
  }
}

export async function getUserData() {
  const user = await currentUser();

  if (!user || !user.emailAddresses?.[0].emailAddress) {
    return null;
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      // Select the specific fields you need for the form
      select: {
        id: true,
        firstName: true,
        lastName: true,
        name: true,
        bio: true,
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}