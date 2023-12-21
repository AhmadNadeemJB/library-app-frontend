import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-7xl font-bold mb-8">Welcome to Your App</h1>
      <div className="flex space-x-4 text-lg">
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link to="/register" className="text-green-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
