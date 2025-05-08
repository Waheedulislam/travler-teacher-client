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
import { FaApple, FaFacebookF } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Register from "@/components/modules/Auth/Register/Register";

interface Props {
  children: ReactElement;
}

export default function LoginRegisterModal({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[820px]">
        <DialogTitle>Зарегистрироваться</DialogTitle>
        <DialogDescription>
          Это абсолютно бесплатно. Зарегистрируйтесь, используя свой адрес
          электронной почты или номер телефона ниже, чтобы начать.
        </DialogDescription>

        {/* Tabs-component  */}
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            {/* Register-file  */}
            <Register setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="login">
            {/* Login-file  */}
            <Login setOpen={setOpen} />
          </TabsContent>
        </Tabs>
        <div className="my-4 flex items-center">
          <Separator className="flex-1" />
          <span className="mx-2 text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>
        <div className="space-y-2">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <FcGoogle size={18} /> Continue with Google
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <FaApple size={18} /> Continue with Apple
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <FaFacebookF size={18} /> Continue with Facebook
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
