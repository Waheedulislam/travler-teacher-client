export interface IUser {
  userId: string;
  name: string;
  email: string;
  image: string;
  isActive?: string;
  role: "user" | "admin" | "teacher";
  iat?: number;
  exp?: number;
}
