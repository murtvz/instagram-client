import React from "react";

import AddComment from "./AddComment";
import Comments from "./Comments";
import Caption from "./Caption";
import PostButtons from "./PostButtons";
import PostHeader from "./PostHeader";

const Post = ({ data, setOpen }) => {
  return (
    <>
      <PostHeader
        avatar={data.avatar}
        username={data.username}
        setOpen={setOpen}
        alreadyFollowing={data.alreadyFollowing}
      />

      {/* Image */}
      <img
        src={data.url}
        alt={`${data.username}'s post`}
        className="aspect-square object-cover"
      />

      <div className="p-3">
        <PostButtons alreadyLiked={data.alreadyLiked} />
        {/* Like count */}
        <div className="text-sm font-semibold cursor-pointer mb-2">
          {data.likeCount} likes
        </div>
        <Caption
          username={data.username}
          setOpen={setOpen}
          body={data.caption}
        />
        <Comments comments={data.comments} setOpen={setOpen} />
        <hr className="opacity-60 my-3" />
        <AddComment />
      </div>
    </>
  );
};

export default Post;
