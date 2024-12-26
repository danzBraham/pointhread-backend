import { User } from "@prisma/client";

export type CreateUser = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUser = Partial<Omit<User, "id" | "authProvider" | "createdAt" | "updatedAt">>;

export interface IUser {
  getOne(id: string): Promise<User | null>;
  getOneByEmail(email: string): Promise<User | null>;
  create(data: CreateUser): Promise<User>;
  update(id: string, data: UpdateUser): Promise<User>;
  delete(id: string): Promise<void>;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
