"use server";

import imagekit from "@/lib/image-kit"

export default async function attFromKit(postId: string) {
  imagekit.deleteFile(postId);
}