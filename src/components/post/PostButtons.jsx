import React from "react";
import { gql, useMutation } from "@apollo/client";

import { HeartIcon } from "@heroicons/react/solid";
import {
  AnnotationIcon,
  HeartIcon as HeartOutline,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

const LIKE_POST = gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id) {
      id
      likeCount
      alreadyLiked
    }
  }
`;

const PostButtons = ({ alreadyLiked, id }) => {
  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      id,
    },
  });

  return (
    <div className=" flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        {alreadyLiked ? (
          <HeartIcon onClick={likePost} className="feedBtn !text-red-500" />
        ) : (
          <HeartOutline onClick={likePost} className="feedBtn" />
        )}
        <AnnotationIcon className="feedBtn" />
      </div>
      <PaperAirplaneIcon className="feedBtn rotate-45" />
    </div>
  );
};

export default PostButtons;
