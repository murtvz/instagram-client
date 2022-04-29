import React from "react";
import { HeartIcon, AnnotationIcon } from "@heroicons/react/solid";

const GalleryItem = ({ url, likes, comments, onClick, alreadyLiked }) => {
  return (
    <li
      onClick={onClick}
      className="group relative flex items-center justify-center hover:cursor-pointer"
    >
      <img src={url} alt="user post" className="aspect-square object-cover" />
      {/* Dark on hover */}
      <div className=" absolute inset-x-0 inset-y-0 bg-black opacity-0 group-hover:opacity-40"></div>

      {/* Likes */}
      <div className="absolute space-y-2 md:space-y-0 opacity-0 group-hover:opacity-100 md:flex md:space-x-6">
        <div className="flex items-center space-x-1">
          <HeartIcon
            className={`h-6 w-6 ${
              alreadyLiked ? "text-red-500" : "text-white"
            }`}
          />
          <span className="font-semibold text-white md:text-lg">{likes}</span>
        </div>

        {/* Comments */}
        <div className="flex items-center space-x-1">
          <AnnotationIcon className="h-6 w-6 text-white" />
          <span className="font-semibold text-white md:text-lg">
            {comments}
          </span>
        </div>
      </div>
    </li>
  );
};

export default GalleryItem;
