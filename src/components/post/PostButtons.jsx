import React from "react";

import { HeartIcon } from "@heroicons/react/solid";
import {
  AnnotationIcon,
  HeartIcon as HeartOutline,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

const PostButtons = ({ alreadyLiked }) => {
  return (
    <div className=" flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        {alreadyLiked ? (
          <HeartIcon className="feedBtn !text-red-500" />
        ) : (
          <HeartOutline className="feedBtn" />
        )}
        <AnnotationIcon className="feedBtn" />
      </div>
      <PaperAirplaneIcon className="feedBtn rotate-45" />
    </div>
  );
};

export default PostButtons;
