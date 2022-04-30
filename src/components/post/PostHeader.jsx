import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

import Avatar from "../UI/Avatar";

const PostHeader = ({ avatar, username, setOpen, alreadyFollowing }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Handle (un)following user
  const handleFollow = async () => {
    if (!token) return navigate("/login");
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
        <button
          onClick={handleFollow}
          className="text-sm font-medium text-blue-500 focus:outline-none"
        >
          {alreadyFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>

      {token && (
        <DotsHorizontalIcon className="w-5 h-5 cursor-pointer text-gray-800" />
      )}
    </div>
  );
};

export default PostHeader;
