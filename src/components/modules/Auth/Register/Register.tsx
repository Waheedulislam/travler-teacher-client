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
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import {
  RegisterFormValues,
  registrationSchema,
} from "./RegisterValidationSchema";
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

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const {
    formState: { isSubmitting },
    watch,
    setValue,
  } = form;

  const terms = watch("terms");
  const alerts = watch("alerts");
  const isAgreed = terms && alerts;

  // Safe type for form values
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        data.email,
        data.password
      );

      if (userCredential?.user?.email) {
        toast.success("Successfully signed up");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error || "An unexpected error occurred!");
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
          {isSubmitting ? "Submitting..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
