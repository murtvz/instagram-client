import React, { useRef } from "react";
import { Link } from "react-router-dom";

import Input from "./UI/Input";
import Card from "./UI/Card";
import ButtonPrimary from "./UI/ButtonPrimary";

const LoginForm = ({ isLogin }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();

  return (
    <Card className="w-[22rem] py-5">
      <form
        onSubmit={() => console.log("login")}
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

        <ButtonPrimary type="submit" className="w-64 py-2">
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
