/* eslint-disable react/no-unescaped-entities */
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
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Register from "@/components/modules/Auth/Register/Register";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "@/components/Firebase/firebase.config";
import { toast } from "sonner";

interface Props {
  children: ReactElement;
}

export default function LoginRegisterModal({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();

      if (userCredential?.user?.email) {
        toast.success("Successfully signed in with Google");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred during Google login!");
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

        {/* Tabs component */}
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

          {/* Additional OAuth buttons (optional) */}
          {/* 
          <Button variant="outline" className="w-full flex items-center gap-2">
            <FaApple size={18} /> Continue with Apple
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <FaFacebookF size={18} /> Continue with Facebook
          </Button> 
          */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
