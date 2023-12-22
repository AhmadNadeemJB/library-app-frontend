import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const App: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const URL = import.meta.env.VITE_SERVER_URL;
    try {
      setLoading(true);
      const response = await axios.post(
        `${URL}/register`,
        { fullname, email, password },
        { withCredentials: true }
      );

      // console.log(response.data.message);
      // console.log(response);
      toast({
        title: response.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      navigate("/profile");
    } catch (error: any) {
      const responseOrError =
        error.response.data.error || error.response.data.message;
      console.error(responseOrError);
      // console.log(error);
      toast({
        title: responseOrError,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white px-8 pt-8 pb-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <label
            className="block font-medium text-sm text-gray-700 mb-1"
            htmlFor="username"
          >
            Full Name
          </label>
          <input
            type="text"
            id="username"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300 mb-4"
          />
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
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <div className="pt-4">
          <h4 className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default App;
