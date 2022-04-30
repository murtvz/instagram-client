import React from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Bio from "../components/profile/Bio";
import Gallery from "../components/profile/Gallery";

const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      id
      avatar
      name
      username
      bioLink
      bioText
      followerCount
      followingCount
      postCount
      alreadyFollowing
      followsMe
      posts {
        id
        url
        likeCount
        commentCount
        alreadyLiked
      }
    }
  }
`;

const Profile = () => {
  const { username } = useParams();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username },
  });

  return (
    <>
      {loading && <p>Loading...</p>}

      {error && (
        <div className="flex flex-col items-center">
          <h1 className="my-7 text-2xl font-semibold">
            Sorry, this page isn&apos;t available.
          </h1>
          <p className="mx-7 text-center">
            The link you followed may be broken, or the page may have been
            removed. Go back to <Link to="/">Instagram</Link>
          </p>
        </div>
      )}

      {data && (
        <>
          <Bio user={data.user} />
          <Gallery user={data.user} />
        </>
      )}
    </>
  );
};

export default Profile;
