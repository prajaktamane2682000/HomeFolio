import React from "react";
import Image from "next/image";

export const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt="Header Image"
            className="object-cover h-[400px] w-full"
            width="1800"
            height="0"
          />
        </div>
      </div>
    </section>
  );
};
