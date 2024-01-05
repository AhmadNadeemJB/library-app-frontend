import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const HomePage = () => {
  useEffect(() => {
    console.log(import.meta.env.VITE_SERVER_URL);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-8">
        Login or Signup
      </h1>
      <div className="flex space-x-4 md:space-x-6 text-lg">
        <Link to="/login" >
          <Button variant="default" className="font-semibold">Login</Button>
        </Link>
        <Link to="/register" >
          <Button variant="default" className="font-semibold">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
