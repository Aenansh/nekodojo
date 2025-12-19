import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_DELETING_SECRET;

  if (!webhookSecret) throw new Error("Please add webhook secret");

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_ts = headerPayload.get("svix-timestamp");
  const svix_sg = headerPayload.get("svix-signature");

  if (!svix_id || !svix_ts || !svix_sg) {
    return new Response("Error occured - No svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_ts,
      "svix-signature": svix_sg,
    }) as WebhookEvent;

    console.log(evt.data);
  } catch (error) {
    console.error("Error verifying webhook", error);
    return new Response("Error occured", { status: 500 });
  }

  const { id } = evt.data;
  if (evt.type === "user.deleted") {
    try {
      if (!id) {
        return new Response("No user ID found", { status: 400 });
      }

      await prisma.user.delete({
        where: {
          id: id,
        },
      });

      console.log(`User ${id} deleted from database`);
    } catch (error) {
      console.error("Error deleting user from database:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }
  return new Response("Webhook received successfully!", { status: 200 });
}
