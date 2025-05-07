/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement } from "react";

interface FormModalProps {
  children: ReactElement;
}

const formSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  terms: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to terms" }),
  alerts: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to alerts" }),
});

export default function LoginRegisterModal({ children }: FormModalProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
      alerts: false,
    },
  });

  const {
    formState: { isSubmitting },
    watch,
    setValue,
  } = form;

  const terms = watch("terms");
  const alerts = watch("alerts");
  const isAgreed = terms && alerts;

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Зарегистрироваться</DialogTitle>
          <DialogDescription>
            Это абсолютно бесплатно. Зарегистрируйтесь, используя свой адрес
            электронной почты или номер телефона ниже, чтобы начать.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email or phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        setValue("terms", !!checked)
                      }
                    />
                  </FormControl>
                  <FormLabel className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-blue-500 underline">
                      terms and conditions
                    </a>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alerts"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        setValue("alerts", !!checked)
                      }
                    />
                  </FormControl>
                  <FormLabel className="text-sm">
                    Send me the latest deal alerts
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold"
              disabled={!isAgreed || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Создать аккаунт"}
            </Button>
          </form>
        </Form>

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
