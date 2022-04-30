import React from "react";
import { Link } from "react-router-dom";

const Caption = ({ username, setOpen, body }) => {
  return (
    <>
      {/* When clicking on username, the user profile does not fetch data. same bug as before. it's apollo cache */}
      <Link
        to={`/${username}`}
        onClick={() => setOpen && setOpen(false)}
        className="text-sm font-medium focus:outline-none hover:underline"
      >
        {username}{" "}
      </Link>
      <span className="text-sm">{body}</span>
    </>
  );
};

export default Caption;
