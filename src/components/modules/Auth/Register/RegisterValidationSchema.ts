import * as z from "zod";
// Step 1: Form schema update with 'name'
export const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  terms: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to terms" }),
  alerts: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to alerts" }),
});

// Step 2: TypeScript type from schema
export type RegisterFormValues = z.infer<typeof registrationSchema>;
