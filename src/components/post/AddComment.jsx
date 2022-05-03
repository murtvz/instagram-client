import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";

import { GET_POST } from "../profile/PostModal";
import { GET_FEED } from "../../pages/Feed";

const ADD_COMMENT = gql`
  mutation Comment($body: String!, $postId: ID!) {
    comment(body: $body, postId: $postId) {
      id
      body
      likeCount
      # Update the cache instead of querying for commentCount
      postId {
        id
        commentCount
      }
      commentedBy {
        id
        username
      }
    }
  }
`;

const AddComment = ({ id }) => {
  const commentRef = useRef();

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_FEED], // TEMPORARY remove when you figure out how to update the cache
    update: (cache, { data: { comment } }) => {
      // Get current user post from cache
      const data = cache.readQuery({
        query: GET_POST,
        variables: {
          postId: id,
        },
      });

      // Add new comment to comments array
      if (data) {
        cache.writeQuery({
          query: GET_POST,
          variables: {
            postId: id,
          },
          data: {
            post: {
              ...data.post,
              comments: [comment, ...data.post.comments],
            },
          },
        });
      }
    },
  });

  const handleComment = (e) => {
    e.preventDefault();
    const body = commentRef.current.value;

    if (body)
      addComment({
        variables: {
          body,
          postId: id,
        },
      });

    commentRef.current.value = "";
  };

  return (
    <form onSubmit={handleComment} className="flex">
      <div className="w-full">
        <input
          type="text"
          required
          className="w-full border-0 focus:ring-0 placeholder:text-sm"
          placeholder="Add a comment"
          ref={commentRef}
        />
      </div>
      <button
        type="submit"
        className="text-sm font-medium text-blue-500 disabled:text-blue-300"
      >
        Post
      </button>
    </form>
  );
};

export default AddComment;
