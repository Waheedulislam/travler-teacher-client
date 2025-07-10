export interface IUser {
  userId: string;
  name: string;
  email: string;
  image: string;
  isActive?: string;
  role: string;
  iat?: number;
  exp?: number;
}
