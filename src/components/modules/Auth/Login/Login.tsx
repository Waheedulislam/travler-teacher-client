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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginFormValues, loginSchema } from "./LoginValidationSchema";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { LoginUser } from "@/services/AuthServices";
import { useUser } from "@/Context/UserContext";

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

  const {
    formState: { isSubmitting },
    watch,
    setValue,
  } = form;

  const terms = watch("terms");
  const alerts = watch("alerts");
  const isAgreed = terms && alerts;

  // ✅ Typed onSubmit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await LoginUser(data);

      if (res.success) {
        toast.success(res?.message || "Registration successful!");
        setOpen(false);
        setIsLoading(true);
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred!");
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
          disabled={!isAgreed || isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "авторизоваться"}
        </Button>
      </form>
    </Form>
  );
}
