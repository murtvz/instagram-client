import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import {
  SearchIcon,
  PlusCircleIcon,
  // UserGroupIcon,
  // HeartIcon,
  // PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";

import Avatar from "../UI/Avatar";
import ButtonPrimary from "../UI/ButtonPrimary";
import Container from "./Container";
import CreatePost from "../post/CreatePost";

const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      id
      avatar
    }
  }
`;

const Header = () => {
  const [isCreatePost, setIsCreatePost] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const me = localStorage.getItem("me");

  const { data } = useQuery(GET_USER, { variables: { username: me } });

  return (
    <>
      {isCreatePost && (
        <CreatePost open={isCreatePost} setOpen={setIsCreatePost} />
      )}

      <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <Container className="flex items-center h-16 justify-between px-5">
          {/* Logo */}
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
              alt="Instagram logo"
              className="w-32"
            />
          </Link>

          {/* Search input box */}
          <div
            className={`relative hidden  ${
              token ? "-mr-28 md:block" : "sm:block"
            }`}
          >
            <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="h-9 w-64 rounded-md border-none bg-gray-100 pl-10 placeholder:text-gray-400 focus:border-none focus:ring-transparent"
              type="text"
              placeholder="Search"
            />
          </div>

          {/* Show Icons when a user is logged in */}
          {token && (
            <nav className={`ml-5 flex items-center space-x-4`}>
              <Link to="/">
                <HomeIcon className="navBtn" />
              </Link>
              {/* <PaperAirplaneIcon className="navBtn " /> */}
              <PlusCircleIcon
                className="navBtn"
                onClick={() => setIsCreatePost(true)}
              />
              {/* <UserGroupIcon className="navBtn" /> */}
              {/* <HeartIcon
              className="navBtn"
              onClick={() => console.log("logout")}
            /> */}
              <Link to={`/${me}`}>
                <Avatar src={data?.user?.avatar} size="w-8 h-8" />
              </Link>
            </nav>
          )}

          {/* Show Login and Signup buttons */}
          {!token && (
            <ButtonPrimary
              className="mr-3 px-2 py-1"
              onClick={() => navigate("/login")}
            >
              Log In
            </ButtonPrimary>
          )}
        </Container>
      </header>
    </>
  );
};

export default Header;
