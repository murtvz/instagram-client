import React from "react";
import { useNavigate } from "react-router-dom";

import ButtonPrimary from "../UI/ButtonPrimary";
import ButtonSecondary from "../UI/ButtonSecondary";
import { UserIcon } from "@heroicons/react/solid";

const BioButtons = ({ user }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const me = localStorage.getItem("me");

  // Handle sending message
  const handleMessage = () => {
    console.log("message sent");
  };

  // Handle following and unfollowing user
  const handleFollow = async () => {
    if (!token) return navigate("/login");
  };

  return (
    <>
      {/* If no user is logged in */}
      {!token && (
        <ButtonPrimary
          onClick={handleFollow}
          className="px-5 py-1 md:relative md:top-1 md:h-8"
        >
          Follow
        </ButtonPrimary>
      )}

      {/* If a user is logged in but this is some other users profile*/}
      {token && me !== user.username && (
        <div className="relative top-1 space-x-2 md:flex md:items-center md:justify-center">
          <ButtonSecondary
            onClick={handleMessage}
            className="px-9 py-[4.5px] md:px-3"
          >
            Message
          </ButtonSecondary>
          {user.alreadyFollowing ? (
            <ButtonSecondary onClick={handleFollow} className="px-3 ">
              <UserIcon className="relative -top-[2px] inline-block h-5 w-5 text-gray-500" />
            </ButtonSecondary>
          ) : (
            <ButtonPrimary onClick={handleFollow} className="px-3 py-1 md:px-6">
              {user.followsMe ? "Follows you" : "Follow"}
            </ButtonPrimary>
          )}
        </div>
      )}

      {/* The logged in users profile*/}
      {token && me === user.username && (
        <ButtonSecondary
          onClick={() => console.log("logout")}
          className="px-24 md:relative md:top-1 md:h-8 md:px-5"
        >
          Sign Out
        </ButtonSecondary>
      )}
    </>
  );
};

export default BioButtons;
