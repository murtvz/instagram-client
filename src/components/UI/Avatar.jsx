import React from "react";

const Avatar = ({ onClick, size, src, className }) => {
  return (
    <img
      src={
        src ||
        "https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
      }
      alt="user profile"
      className={`object-cover rounded-full ${
        size || "h-10 w-10"
      } ${className}`}
    />
  );
};

export default Avatar;
