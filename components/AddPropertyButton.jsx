import { useFormStatus } from "react-dom";

export const AddPropertyButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
      type="submit"
      disabled={pending}
    >
      {pending ? "Adding..." : "Add Property"}
    </button>
  );
};
