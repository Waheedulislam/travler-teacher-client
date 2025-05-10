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
import { registerUser } from "@/services/AuthServices";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import {
  RegisterFormValues,
  registrationSchema,
} from "./RegisterValidationSchema";
import { useUser } from "@/Context/UserContext";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/firebase.config";
export default function Register({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
      alerts: false,
    },
  });
  const { setIsLoading } = useUser();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const {
    formState: { isSubmitting },
    watch,
    setValue,
  } = form;

  const terms = watch("terms");
  const alerts = watch("alerts");
  const isAgreed = terms && alerts;

  // Step 3: Safe type for form values
  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   try {
  //     // Create user in Firebase
  //     const firebaseUser = await createUserWithEmailAndPassword(
  //       data.email,
  //       data.password
  //     );

  //     if (firebaseUser?.user) {
  //       // Prepare the data you want to send to your backend
  //       const payload = {
  //         name: data.name,
  //         email: data.email,
  //         password: data.password,
  //       };

  //       // Send to your backend
  //       const res = await registerUser(payload);

  //       if (res.success) {
  //         toast.success(res?.message || "Registration successful!");
  //         setOpen(false);
  //         setIsLoading(true);
  //       } else {
  //         toast.error(res?.message || "Something went wrong!");
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("An unexpected error occurred!");
  //   }
  // };

  // Step 3: Safe type for form values
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Create user in Firebase
      const firebaseUser = await createUserWithEmailAndPassword(
        data.email,
        data.password
      ).then((data) => {
        if (data?.user?.email) {
          toast.success("Successfully login");
          setOpen(false);
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred!");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Terms Checkbox */}
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

        {/* Alerts Checkbox */}
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold"
          disabled={!isAgreed || isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Создать аккаунт"}
        </Button>
      </form>
    </Form>
  );
}
