import React from "react";
import { gql, useQuery } from "@apollo/client";

import Post from "../post/Post";
import Modal from "../UI/Modal";

export const GET_POST = gql`
  query GetPost($postId: ID!) {
    post(id: $postId) {
      id
      caption
      alreadyLiked
      likeCount
      comments {
        id
        body
        likeCount
        commentedBy {
          id
          username
        }
      }
    }
  }
`;

const PostModal = ({ open, setOpen, post, user }) => {
  const { data } = useQuery(GET_POST, {
    variables: { postId: post.id },
  });

  // adding postedBy property to match data query on Feed
  const allData = { postedBy: user, ...post, ...data?.post };

  return (
    <>
      {data?.post && (
        <Modal open={open} setOpen={setOpen}>
          <Post
            className="rounded-lg max-w-2xl"
            data={allData}
            setOpen={setOpen}
          />
        </Modal>
      )}
    </>
  );
};

export default PostModal;
