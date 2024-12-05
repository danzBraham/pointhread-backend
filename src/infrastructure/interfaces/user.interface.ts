import { User } from "@prisma/client";

export type CreateUser = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUser = Partial<Omit<User, "id" | "authProvider" | "createdAt" | "updatedAt">>;

export type RegisterRequest = Pick<User, "username" | "email" | "password">;
export type LoginRequest = Pick<User, "email" | "password">;

export interface IUser {
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  create(data: CreateUser): Promise<Pick<User, "id" | "username" | "email" | "createdAt">>;
  update(
    id: string,
    data: UpdateUser
  ): Promise<Pick<User, "id" | "username" | "email" | "updatedAt">>;
  delete(id: string): Promise<User | null>;
}
