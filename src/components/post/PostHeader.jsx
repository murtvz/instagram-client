import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { gql, useMutation } from "@apollo/client";

import Avatar from "../UI/Avatar";

const FOLLOW_USER = gql`
  mutation FollowUser($id: ID!) {
    follow(id: $id) {
      id
      alreadyFollowing
      followerCount
    }
  }
`;

const PostHeader = ({
  avatar,
  username,
  setOpen,
  alreadyFollowing,
  followsMe,
  id,
}) => {
  const token = localStorage.getItem("token");
  const me = localStorage.getItem("me");
  const navigate = useNavigate();

  const [follow] = useMutation(FOLLOW_USER, {
    variables: {
      id,
    },
  });

  // Handle (un)following user
  const handleFollow = async () => {
    if (!token) return navigate("/login");
    follow();
  };

  return (
    <div className="p-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Avatar src={avatar} />
        <Link
          to={`/${username}`}
          onClick={() => setOpen && setOpen(false)}
          className="text-sm font-medium focus:outline-none"
        >
          {username}
        </Link>
        {me !== username && (alreadyFollowing || followsMe) && (
          <button
            onClick={handleFollow}
            className="text-sm font-medium text-blue-500 focus:outline-none"
          >
            {alreadyFollowing && "Unfollow"}
            {!alreadyFollowing && !followsMe && "Follow"}
            {!alreadyFollowing && followsMe && "Follows you"}
          </button>
        )}
      </div>

      {token && (
        <DotsHorizontalIcon className="w-5 h-5 cursor-pointer text-gray-800" />
      )}
    </div>
  );
};

export default PostHeader;
