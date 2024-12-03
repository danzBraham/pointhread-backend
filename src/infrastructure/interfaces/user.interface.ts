import { User } from "@prisma/client";

export type InsertUser = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUser = Partial<Omit<User, "id" | "authProvider" | "createdAt" | "updatedAt">>;

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface IUser {
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  create(user: InsertUser): Promise<Pick<User, "id" | "username" | "email" | "createdAt">>;
  update(
    id: string,
    user: UpdateUser
  ): Promise<Pick<User, "id" | "username" | "email" | "updatedAt">>;
  delete(id: string): Promise<User | null>;
}
