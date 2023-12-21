import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const URL = "https://cyan-upset-skunk.cyclic.app";
      const URL = "http://localhost:3000";
      const response = await axios.post(
        `${URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      toast({
        title: `Logged In as ${response.data.fullname}`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      navigate("/profile");
    } catch (error:any) {
      console.error(error);

      if (error.response && error.response.data === "Unauthorized") {
        toast({
          title: "Invalid Credentials",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white px-8 pt-8 pb-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
            type="submit"
            className="disabled:opacity-50 disabled:scale-[0.95] disabled:cursor-not-allowed w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="pt-4">
          <h4 className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              Register
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
