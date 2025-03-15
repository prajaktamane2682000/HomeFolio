"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function addMessage(previousState, formData) {
  await connectDB();

  //get the session user
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }

  //get the id from sessionUser

  const { userId } = sessionUser;

  const recipient = formData.get("recipient");
  if (userId === recipient) {
    return { error: "You cant send message to yourself" };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;
