"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/globalContext";
export const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnReadCount } = useGlobalContext();

  async function handleReadClick() {
    const read = await markMessageAsRead(message._id);

    setIsRead(read);
    setUnReadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked As ${read ? "Read" : "New"}`);
  }

  async function handleDeleteClick() {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnReadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success("Message Deleted");
  }

  if (isDeleted) {
    return <p>Deleted Message</p>;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700"> {message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <Link href={`mailto:${message.email}`} className="text-blue-500">
            {" "}
            {message.email}
          </Link>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <Link href={`Tel:${message.phone}`} className="text-blue-500">
            {" "}
            {message.phone}
          </Link>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark as new" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};
