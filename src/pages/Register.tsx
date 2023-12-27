import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { set } from "lodash";

const App: React.FC = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [usernameError, setusernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const validateForm = () => {
    let isValid = true;

    // Validate Full Name
    if (!username.trim() || !/\s/.test(username) || /^\S+\s*$/.test(username)) {
      setusernameError("Enter your full name");
      isValid = false;
    }
    // Validate Email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    }

    // Validate Password
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else if (password.length > 20) {
      setPasswordError("Password must not exceed 20 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Form Validation
    if (!validateForm()) {
      setLoading(false);
      setButtonDisable(true);
      return;
    }

    try {
      console.log(username, email, password)
      const URL = import.meta.env.VITE_SERVER_URL;
      const response = await axios.post(
        `${URL}/register`,
        { username, email, password },
        { withCredentials: true }
      );

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
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
              setusernameError("");
              setButtonDisable(false);
            }}
            className="w-full border px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300"
          />
          <div className="mb-2 mt-1">
            {usernameError && (
              <p className="text-red-500 text-sm">{usernameError}</p>
            )}
          </div>
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
            onChange={(e) => {
              setEmail(e.target.value);
              setButtonDisable(false);
              setEmailError("");
            }}
            className="w-full border px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300 "
          />
          <div className="mb-2 mt-1">
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
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
            onChange={(e) => {
              setPassword(e.target.value);
              setButtonDisable(false);
              setPasswordError("");
            }}
            className="w-full border px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300 "
          />
          <div className="mb-4 mt-1">
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="disabled:opacity-50 disabled:scale-[0.95] disabled:cursor-not-allowed w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
            disabled={loading || buttonDisable}
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
