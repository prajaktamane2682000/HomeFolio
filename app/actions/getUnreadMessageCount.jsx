"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";

const getUnreadMessageCount = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: "User ID is required" };
  }

  const { userId } = sessionUser;

  // Find user in database
  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
};

export default getUnreadMessageCount;
