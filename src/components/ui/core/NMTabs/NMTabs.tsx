/* eslint-disable react/no-unescaped-entities */
"use client";

import { ReactElement, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Login from "@/components/modules/Auth/Login/Login";
import Register from "@/components/modules/Auth/Register/Register";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface Props {
  children: ReactElement;
}

export default function LoginRegisterModal({ children }: Props) {
  const [open, setOpen] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const res = await signIn("google", {
        redirect: false,
        callbackUrl: "/profile",
      });
      console.log(res);

      if (res?.error) {
        toast.error("Google login failed");
      } else {
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during Google login!");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const res = await signIn("facebook", {
        redirect: false,
        callbackUrl: "/profile",
      });

      if (res?.error) {
        toast.error("Facebook login failed");
      } else {
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during Facebook login!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[820px]">
        <DialogTitle>Sign Up</DialogTitle>
        <DialogDescription className="text-md">
          It's absolutely free. Sign up and Sign in using your email or phone
          number below to get started.
        </DialogDescription>

        {/* Tabs */}
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Register setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="login">
            <Login setOpen={setOpen} />
          </TabsContent>
        </Tabs>

        <div className="my-4 flex items-center">
          <Separator className="flex-1" />
          <span className="mx-2 text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <div className="space-y-2">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <FcGoogle size={18} /> Continue with Google
          </Button>

          <Button
            onClick={handleFacebookLogin}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <FaFacebookF size={18} /> Continue with Facebook
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
