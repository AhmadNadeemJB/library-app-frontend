import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const validateForm = () => {
    let isValid = true;

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Form Validation
    if (!validateForm()) {
      setLoading(false);
      setButtonDisable(true);
      return;
    }

    try {
      const URL = "https://cyan-upset-skunk.cyclic.app";
      // const URL = "http://localhost:3000";
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
    } catch (error: any) {
      const responseOrError =
        error.response.data.error || error.response.data.message;
      {
        responseOrError
          ? toast({
              title: responseOrError,
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "top-right",
            })
          : null;
      }

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
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setButtonDisable(false);
            }}
            className="w-full border px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300"
          />
          <div className="mb-1 mt-1">
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
              setPasswordError("");
              setButtonDisable(false);
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
            className="disabled:opacity-50 disabled:scale-[0.98] disabled:cursor-not-allowed w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
            disabled={loading || buttonDisable}
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
