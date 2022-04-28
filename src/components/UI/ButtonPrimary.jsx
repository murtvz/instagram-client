import React from "react";

const ButtonPrimary = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-blue-500 text-white font-semibold text-sm rounded-md disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
