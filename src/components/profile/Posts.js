import React from "react";
import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <div className="grid w-full grid-cols-3 gap-1 md:gap-7 md:px-4">
      {posts.map((post) => (
        <Post
          url={post.url}
          likes={post.likeCount}
          comments={post.commentCount}
          key={post.id}
        />
      ))}
    </div>
  );
};

export default Posts;
