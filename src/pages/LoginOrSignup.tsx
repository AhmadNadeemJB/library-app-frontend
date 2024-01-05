import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Component() {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <Tabs defaultValue="login" className="px-6 w-10/12 sm:px-0 sm:w-[28rem]">
        <TabsList className="grid w-full grid-cols-2 transition-all">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="sign-up">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
}
