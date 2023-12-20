// src/LoginPage.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = (e: any) => {
    e.preventDefault();
    // Make a POST request to the login endpoint
    axios
      .post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      )
      .then((e) => {
        // Handle the successful login response
        toast({
          title: "Logged In as " + e.data.fullname,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        console.log(e.data);
        navigate("/profile");
      })
      .catch((error) => {
        // Handle login failure
        console.log(error);
        if ((error.response.data = "Unauthorized")) {
          toast({
            title: "Invalid Credentials",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <label
          className="block font-medium text-sm text-gray-700 mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300 mb-4"
        />
        <label
          className="block font-medium text-sm text-gray-700 mb-1"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300 mb-6"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
