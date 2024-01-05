import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface ProfileState {
  password: string;
  username: string;
  email: string;
}

const App: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileState>({
    password: "",
    username: "",
    email: "",
  });
  const { email, password, username } = profileData;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(username, email, password);
      const URL = import.meta.env.VITE_SERVER_URL;
      const response = await axios.post(
        `${URL}/register`,
        { username, email, password },
        { withCredentials: true }
      );

      toast({
        title: response.data.message,
        duration: 4000,
      });

      navigate("/profile");
    } catch (error: any) {
      const responseOrError =
        error.response.data.error || error.response.data.message;

      toast({
        title: responseOrError,
        duration: 4000,
      });
    } finally {
      setLoading(false);

      setProfileData({
        email: "",
        password: "",
        username: "",
      });
    }
  };

  return (
    <Card>
      <form onSubmit={handleRegister}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Register</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="username">Full Name</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setProfileData((prevData) => ({
                  ...prevData,
                  username: e.target.value,
                }));
              }}
            />
          </div>
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
            />
            <div className="mb-4 mt-1"></div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default App;
