import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { logout } from "../../utils";
import Avatar from "../UI/Avatar";

const GET_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      id
      username
      name
      avatar
    }
  }
`;

const MiniProfile = ({ className }) => {
  const navigate = useNavigate();
  const me = localStorage.getItem("me");

  const { data } = useQuery(GET_USER, {
    variables: { username: me },
  });
  return (
    <>
      {data && (
        <div className="flex items-center fixed top-20 ml-6 mt-10 w-72">
          <Link to={`/${me}`}>
            <Avatar src={data.user.avatar} size="h-14 w-14" />
          </Link>
          <div className="mx-4">
            <Link to={`/${me}`} className="font-medium text-sm">
              {data.user.username}
            </Link>
            <p className="text-sm text-gray-400">{data.user.name}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/login", {
                replace: true,
              });
            }}
            className="ml-auto text-xs font-medium text-blue-400"
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default MiniProfile;
