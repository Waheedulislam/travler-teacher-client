export interface IUser {
  userId: string;
  name: string;
  email: string;
  isActive?: string;
  role: "user" | "admin" | "teacher";
  iat?: number;
  exp?: number;
}
