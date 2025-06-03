"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginFormValues, loginSchema } from "./LoginValidationSchema";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/Context/UserContext";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/services/AuthServices";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "@/components/Firebase/firebase.config";

export default function Login({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
      alerts: false,
    },
  });

  const { setIsLoading } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    formState: { isSubmitting },
    watch,
    setValue,
  } = form;

  const terms = watch("terms");
  const alerts = watch("alerts");
  const isAgreed = terms && alerts;

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   setLoading(true);
  //   try {
  //     const result = await LoginUser(data);

  //     if (result.success) {
  //       toast.success("Login successful!");
  //       setOpen(false);
  //       setIsLoading(true);

  //       // Optional: redirect to profile
  //       router.push("/profile");
  //     } else {
  //       toast.error(result.message || "Login failed");
  //     }
  //   } catch (err: any) {
  //     toast.error(err.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      // ১. Firebase এ লগিন
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (userCredential.user) {
        const result = await LoginUser({
          email: data.email,
          password: data.password,
        });

        if (result.success) {
          toast.success("Login successful!");
          setOpen(false);
          setIsLoading(true);
          router.push("/profile");
        } else {
          toast.error(result.message || "Login failed");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
                  onCheckedChange={(checked) => setValue("terms", !!checked)}
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
                  onCheckedChange={(checked) => setValue("alerts", !!checked)}
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
          disabled={!isAgreed || isSubmitting || loading}
        >
          {isSubmitting || loading ? "Submitting..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
