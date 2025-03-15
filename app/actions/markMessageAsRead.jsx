"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";

const markMessageAsRead = async (messageId) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: "User ID is required" };
  }

  const { userId } = sessionUser;

  // Find user in database
  const user = await User.findById(userId);

  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error("Message not found");
  }

  //verify ownership

  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  message.read = !message.read;
  revalidatePath("/messages", "page");

  await message.save();

  return message.read;
};

export default markMessageAsRead;
