import React from "react";
import Post from "../post/Post";
import Card from "../UI/Card";

const Posts = ({ posts, className }) => {
  return (
    <>
      {posts.map((post) => (
        <Card key={post.id} className={className}>
          <Post data={post} />
        </Card>
      ))}
    </>
  );
};

export default Posts;
