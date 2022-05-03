import React from "react";
import { Navigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Posts from "../components/feed/Posts";
import MiniProfile from "../components/feed/MiniProfile";

export const GET_FEED = gql`
  query Feed {
    feed {
      id
      url
      caption
      likeCount
      alreadyLiked
      postedBy {
        id
        username
        avatar
      }
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

const Feed = () => {
  const { data, loading } = useQuery(GET_FEED);

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {loading && <p>Loading...</p>}

      {data && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          <Posts
            className="col-span-2 mx-auto mt-6 !border-0 sm:!border-[1px] max-w-2xl"
            posts={data.feed}
          />
          <div className="hidden lg:block col-span-1">
            <MiniProfile />
          </div>
        </div>
      )}
    </>
  );
};

export default Feed;
