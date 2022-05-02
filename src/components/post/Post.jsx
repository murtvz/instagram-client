import React from "react";
import { gql, useMutation } from "@apollo/client";

import AddComment from "./AddComment";
import Comments from "./Comments";
import Caption from "./Caption";
import PostButtons from "./PostButtons";
import PostHeader from "./PostHeader";

const LIKE_POST = gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id) {
      id
      likeCount
      alreadyLiked
    }
  }
`;

const Post = ({ data, setOpen }) => {
  const token = localStorage.getItem("token");

  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      id: data.id,
    },
  });

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
        onDoubleClick={likePost}
      />

      <div className="p-3">
        {token && (
          <PostButtons likePost={likePost} alreadyLiked={data.alreadyLiked} />
        )}
        {/* Like count */}
        <div className="text-sm font-semibold cursor-pointer mb-2">
          {data.likeCount} {data.likeCount === 1 ? "like" : "likes"}
        </div>
        <Caption
          username={data.username}
          setOpen={setOpen}
          body={data.caption}
        />
        <Comments comments={data.comments} setOpen={setOpen} />
        {token && (
          <>
            <hr className="opacity-60 my-3" />
            <AddComment id={data.id} />
          </>
        )}
      </div>
    </>
  );
};

export default Post;
