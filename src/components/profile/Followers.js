import React from "react";

const Followers = ({ desktop, mobile, user }) => {
  return (
    <>
      {desktop && (
        <div className="hidden space-x-12 md:flex">
          <div className="space-x-2">
            <span className="font-medium ">{user.postCount}</span>
            <span className=" text-gray-600">posts</span>
          </div>
          <button className="cursor-pointer space-x-2">
            <span className="font-medium ">{user.followerCount}</span>
            <span className=" text-gray-600">followers</span>
          </button>
          <button className="cursor-pointer space-x-2">
            <span className="font-medium ">{user.followingCount}</span>
            <span className=" text-gray-600">following</span>
          </button>
        </div>
      )}

      {mobile && (
        <div className="md:hidden">
          <hr />
          <div className="flex justify-around py-3">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">{user.postCount}</span>
              <span className="text-sm text-gray-400">posts</span>
            </div>
            <button className="flex cursor-pointer flex-col items-center">
              <span className="text-sm font-medium">{user.followerCount}</span>
              <span className="text-sm text-gray-400">followers</span>
            </button>
            <button className="flex cursor-pointer flex-col items-center">
              <span className="text-sm font-medium">{user.followingCount}</span>
              <span className="text-sm text-gray-400">following</span>
            </button>
          </div>
          <hr />
        </div>
      )}
    </>
  );
};

export default Followers;
