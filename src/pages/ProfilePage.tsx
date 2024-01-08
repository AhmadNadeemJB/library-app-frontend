import React, { useState } from "react";
import axios from "axios";
import { AvatarImage, AvatarFallback, Avatar } from "../components/ui/avatar";
import {
  DialogTrigger,
  DialogContent,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { AiOutlineEdit } from "react-icons/ai";

import { useQuery, useMutation, useQueryClient } from "react-query";

interface ProfileState {
  currentPassword: string;
  username: string;
  email: string;
  newPassword: string;
}

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  // These states are for dialogs.
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [profileData, setProfileData] = useState<ProfileState>({
    currentPassword: "",
    username: "",
    email: "",
    newPassword: "",
  });
  const { currentPassword, username, email, newPassword } = profileData;

  const { toast } = useToast();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_SERVER_URL;

  function handleLogout() {
    setLoading(true);
    axios
      .get(URL + "/logout", { withCredentials: true })
      .then(async (response) => {
        console.log(response);
        toast({
          title: "Logged Out",
          duration: 4000,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log("Error while logging out : ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function getUser() {
    return await axios
      .get(URL + "/profile", { withCredentials: true })
      .then(async (response) => response.data)
      .catch((error) => {
        console.log("Error from Profile Page", error);
        navigate("/");
      });
  }

  async function handleUpdate(newData: Partial<ProfileState>) {
    console.log("Refached data");
    const response = await axios.patch(URL + "/update", newData, {
      withCredentials: true,
    });
    setLoading(true);

    return response.data.user; // Assuming your API returns the updated user data
  }

  async function handleDelete() {
    const response = await axios.delete(URL + "/delete", {
      data: { currentPassword: profileData.currentPassword },
      withCredentials: true,
    });
    return response;
  }

  const queryClient = useQueryClient();

  const { data: userData, isLoading: isUserDataLoading } = useQuery(
    "userData",
    getUser
  );

  const { mutateAsync: updateUser } = useMutation(handleUpdate, {
    onError: (error: any) => {
      toast({
        title: error.response.data.message || error.response.data.error,
        duration: 4000,
        variant: "destructive",
      });
      setProfileData((prevData) => ({
        ...prevData,
        currentPassword: "",
      }));
      setLoading(false);
    },
    onSuccess: () => {
      setOpen1(false);
      setOpen2(false);
      setOpen3(false);

      setLoading(false);

      setProfileData({
        currentPassword: "",
        email: "",
        newPassword: "",
        username: "",
      });

      // Invalidate and refetch
      queryClient.invalidateQueries("userData");
      toast({
        title: "Profile updated successfully",
        duration: 4000,
      });
    },
  });

  const { mutateAsync: deleteUser, isLoading } = useMutation(handleDelete, {
    onError: (error: any) => {
      toast({
        title: error.response.data.message || error.response.data.error,
        duration: 4000,
        variant: "destructive",
      });
      setProfileData((prevData) => ({
        ...prevData,
        currentPassword: "",
      }));
      setLoading(false);
    },
    onSuccess: () => {
      setOpen1(false);
      setOpen2(false);
      setOpen3(false);

      setLoading(false);

      setProfileData({
        currentPassword: "",
        email: "",
        newPassword: "",
        username: "",
      });

      queryClient.invalidateQueries("userData");

      toast({
        title: "Profile Deleted successfully",
        duration: 4000,
        variant: "destructive",
      });
    },
  });

  if (isUserDataLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col px-32 min-w-max justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col px-4 md:px-32 w-11/12 sm:w-9/12 lg:w-6/12">
        <Card className="p-4 sm:p-7">
          {/* First Dialog */}
          <div className="flex justify-between items-center">
            <Dialog modal open={open1} onOpenChange={setOpen1}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words line-clamp-2">
                {userData ? userData.username : ""}
              </h1>
              <DialogTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <AiOutlineEdit className="w-6 h-6 mr-2" />
                </div>
              </DialogTrigger>
              <DialogContent className="w-11/12 rounded-lg">
                <DialogHeader>
                  <DialogTitle>Edit Name</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e: any) => e.preventDefault()}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Name</Label>
                      <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setProfileData((prevData) => ({
                            ...prevData,
                            username: e.target.value,
                          }));
                        }}
                        id="username"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setProfileData((prevData) => ({
                            ...prevData,
                            currentPassword: e.target.value,
                          }));
                        }}
                        value={profileData.currentPassword}
                        id="currentPassword1"
                        placeholder="Enter your current password"
                        type="password"
                      />
                    </div>

                    <DialogFooter className="sm:justify-start">
                      <Button
                        type="submit"
                        className="ml-auto mr-2"
                        onClick={() =>
                          updateUser({ username, currentPassword })
                        }
                        disabled={loading}
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Second Dialog */}
          <div className="flex justify-between items-center py-2 mb-4">
            <Dialog modal open={open2} onOpenChange={setOpen2}>
              <h1 className="text-xl mb-2 line-clamp-1 break-words">
                {userData ? userData.email : ""}
              </h1>
              <DialogTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <AiOutlineEdit className="w-6 h-6 mr-2" />
                </div>
              </DialogTrigger>
              <DialogContent className="w-11/12 rounded-lg">
                <DialogHeader>
                  <DialogTitle>Edit Email</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e: any) => e.preventDefault()}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setProfileData((prevData) => ({
                            ...prevData,
                            email: e.target.value,
                          }));
                        }}
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="" htmlFor="currentPassword2">
                        Current Password
                      </Label>
                      <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setProfileData((prevData) => ({
                            ...prevData,
                            currentPassword: e.target.value,
                          }));
                        }}
                        value={profileData.currentPassword}
                        id="currentPassword2"
                        placeholder="Enter your current password"
                        type="password"
                      />
                    </div>

                    <DialogFooter>
                      <Button
                        onClick={() => {
                          updateUser({ currentPassword, email });
                        }}
                        type="submit"
                        className="ml-auto"
                        disabled={loading}
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          {/* Third Dialog */}
          <div className="flex justify-between">
            <Dialog modal open={open3} onOpenChange={setOpen3}>
              <DialogTrigger asChild>
                <Button className="mb-2 w-full">Change Password</Button>
              </DialogTrigger>
              <DialogContent className="w-11/12 rounded-lg">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e: any) => e.preventDefault()}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setProfileData((prevData) => ({
                            ...prevData,
                            newPassword: e.target.value,
                          }));
                        }}
                        id="newPassword"
                        placeholder="Enter new password"
                        type="password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword3">Current Password</Label>
                      <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setProfileData((prevData) => ({
                            ...prevData,
                            currentPassword: e.target.value,
                          }));
                        }}
                        value={profileData.currentPassword}
                        id="currentPassword3"
                        placeholder="Enter your current password"
                        type="password"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() => {
                          updateUser({ currentPassword, newPassword });
                        }}
                        type="submit"
                        className="ml-auto"
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-x-2">
            <Button
              onClick={() => {
                handleLogout();
              }}
              variant="destructive"
              className="w-full"
              disabled={loading}
            >
              Logout
            </Button>

            <Dialog modal open={open3} onOpenChange={setOpen3}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent className="w-11/12 rounded-lg">
                <DialogHeader>
                  <DialogTitle>This action can't be undone</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e: any) => e.preventDefault()}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword4">Current Password</Label>
                      <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setProfileData((prevData) => ({
                            ...prevData,
                            currentPassword: e.target.value,
                          }));
                        }}
                        value={profileData.currentPassword}
                        id="currentPassword4"
                        placeholder="Enter your current password"
                        type="password"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        disabled={isLoading}
                        onClick={() => {
                          deleteUser();
                        }}
                        type="submit"
                        className="ml-auto"
                        variant="destructive"
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
