export interface IUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  isActive?: string;
  role: string;
  iat?: number;
  exp?: number;
}
