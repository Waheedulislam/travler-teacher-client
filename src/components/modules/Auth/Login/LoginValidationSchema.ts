import { z } from "zod";

// ✅ Schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  terms: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to terms" }),
  alerts: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to alerts" }),
});

// ✅ Type from Schema
export type LoginFormValues = z.infer<typeof loginSchema>;
