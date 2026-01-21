import Image from "next/image";
import React from "react";

const AllPhotosDesign = ({ img }) => {
  if (!img) {
    return <p>image not found</p>;
  }

  return (
    <div className="relative w-full h-56 rounded-lg overflow-hidden flex items-center justify-center">
      {img && img.length > 0 && (
        <div>
          {img.map((imageUrl, index) => (
            <Image
              key={index}
              src={imageUrl}
              alt={`feed-image-${index}`}
              height={300}
              width={img.length === 1 ? 600 : 300}
              className="feed-image rounded-[10px] object-cover w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPhotosDesign;
