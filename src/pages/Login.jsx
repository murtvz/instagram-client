import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import Card from "../components/UI/Card";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />

      <Card className="text-center mt-4 w-[22rem] py-5">
        <span>{isLogin ? "Don't have an account?" : "Have an account?"} </span>
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-400 hover:cursor-pointer "
        >
          {isLogin ? "Sign up" : "Log in"}
        </span>
      </Card>
    </div>
  );
};

export default Login;
