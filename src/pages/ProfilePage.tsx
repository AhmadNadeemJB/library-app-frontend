// ProfilePage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const URL = "https://cyan-upset-skunk.cyclic.app";
  // const URL = "http://localhost:3000";

  function handleLogout() {
    setLoading(true);
    axios
      .get(URL + "/logout", { withCredentials: true })
      .then(async (response) => {
        console.log(response);
        setUserData("");

        toast({
          title: "Logged Out",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error while logging out : ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    axios
      .get(URL + "/profile", { withCredentials: true })
      .then(async (response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log("Error from Profile Page", error);
        navigate("/login");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <div className="mb-6">
          <label className="block font-medium text-sm text-gray-700 mb-1">
            Username
          </label>
          <p className="text-gray-800">{userData ? userData.fullname : ""}</p>
        </div>
        <div className="mb-6">
          <label className="block font-medium text-sm text-gray-700 mb-1">
            Email
          </label>
          <p className="text-gray-800">{userData ? userData.email : ""}</p>
        </div>
        <button
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
