"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

import cloudinary from "@/config/cloudinary";

async function deleteProperty(propertyId) {

  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser && sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property Not Found");
  }

  //verify ownership

  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorised");
  }

  //To delete the images from cloudnary

  //1. extract public ID from image URLS

  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  //Delete images from cloudinary

  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    }
  }

  //This will delete the property by its ID
  await property.deleteOne();

  //revalidate the path
  revalidatePath("/", "layout");
}
export default deleteProperty;
