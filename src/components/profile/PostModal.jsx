import React from "react";
import { gql, useQuery } from "@apollo/client";

import Post from "../post/Post";
import Modal from "../UI/Modal";

const GET_POST = gql`
  query GetPost($postId: ID!) {
    post(id: $postId) {
      id
      caption
      comments {
        id
        body
        likeCount
        commentedBy {
          id
          username
          avatar
        }
      }
    }
  }
`;

const PostModal = ({ open, setOpen, post, user }) => {
  const { data } = useQuery(GET_POST, {
    variables: { postId: post.id },
  });

  const allData = { ...user, ...post, ...data?.post };

  return (
    <>
      {data?.post && (
        <Modal className="rounded-lg max-w-2xl" open={open} setOpen={setOpen}>
          <Post data={allData} setOpen={setOpen} />
        </Modal>
      )}
    </>
  );
};

export default PostModal;
