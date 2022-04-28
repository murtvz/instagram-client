import React from "react";

const ButtonSecondary = ({ children, className, ...props }) => {
  return (
    <button
      className={`border-[1px] py-[3.5px] rounded-md font-semibold  text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
