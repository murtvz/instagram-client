import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

import Input from "./UI/Input";
import Card from "./UI/Card";
import ButtonPrimary from "./UI/ButtonPrimary";

const SIGNUP_USER = gql`
  mutation Signup(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        username
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

const LoginForm = ({ isLogin }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();

  const navigate = useNavigate();

  const [login, { loading }] = useMutation(isLogin ? LOGIN_USER : SIGNUP_USER, {
    onCompleted({ login, signup }) {
      if (login || signup) {
        localStorage.setItem("token", login ? login.token : signup.token);
        localStorage.setItem(
          "me",
          login ? login.user.username : signup.user.username
        );
        navigate("/", { replace: true });
      }
    },
    onError(err) {
      console.error(err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      variables: {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
        email: emailRef.current?.value,
        name: usernameRef.current?.value,
      },
    });
  };

  return (
    <Card className="w-[22rem] py-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-3"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
          alt="Instagram logo"
          width={250}
        />

        {!isLogin && (
          <>
            <p className="w-64 text-center font-semibold text-gray-500">
              Sign up to see photos and videos from your friends.
            </p>

            <Input
              label="Email"
              input={{
                type: "email",
                id: "email",
                name: "email",
                required: true,
              }}
              ref={emailRef}
            />
            <Input
              label="Name"
              input={{
                type: "text",
                id: "name",
                name: "name",
                required: true,
              }}
              ref={nameRef}
            />
          </>
        )}

        <Input
          label="Username"
          input={{
            type: "text",
            id: "username",
            name: "username",
            required: true,
            minLength: 3,
          }}
          ref={usernameRef}
        />

        <Input
          label="Password"
          input={{
            type: "password",
            id: "password",
            name: "password",
            required: true,
            minLength: 8,
          }}
          ref={passwordRef}
        />

        <ButtonPrimary type="submit" className="w-64 py-2" disabled={loading}>
          {isLogin ? "Log In" : "Signup"}
        </ButtonPrimary>

        <Link to="/reset" className="text-sm">
          Forgot password?
        </Link>
      </form>
    </Card>
  );
};

export default LoginForm;
