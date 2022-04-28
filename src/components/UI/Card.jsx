import React from "react";

const Card = (props) => {
  return (
    <div
      className={`shadow-sm border-[1px] border-gray-200 bg-white ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
