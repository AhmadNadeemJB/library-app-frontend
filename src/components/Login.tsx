import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ProfileState {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileState>({
    email: "",
    password: "",
  });
  const { email, password } = profileData;

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const URL = import.meta.env.VITE_SERVER_URL;
      const response = await axios.post(
        `${URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      toast({
        title: `Logged In as ${response.data.username}`,
        duration: 4000,
      });

      setProfileData({
        email: "",
        password: "",
      });

      navigate("/profile");
    } catch (error: any) {
      const responseOrError =
        error.response.data.error || error.response.data.message;
      {
        responseOrError
          ? toast({
              title: responseOrError,
              duration: 4000,
              variant: "destructive",
            })
          : null;
      }

      setProfileData((prevData) => ({
        ...prevData,
        password: "",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleLogin}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setProfileData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }));
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setProfileData((prevData) => ({
                  ...prevData,
                  password: e.target.value,
                }));
              }}
              className="w-full border px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300 "
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginPage;
