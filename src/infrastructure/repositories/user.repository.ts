import "reflect-metadata";

import { PrismaClient, User } from "@prisma/client";
import { inject, injectable } from "inversify";

import { CreateUser, IUser, UpdateUser } from "@/infrastructure/entities/user.entity";
import { TYPES } from "@/infrastructure/types";

import { handleDBError } from "../utils/db-error-handler";

@injectable()
export class UserRepository implements IUser {
  private prisma: PrismaClient;

  constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getOne(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      handleDBError(error, "Failed to get user by id");
    }
  }

  public async getOneByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      handleDBError(error, "Failed to get user by email");
    }
  }

  public async create(data: CreateUser): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      handleDBError(error, "Failed to create user");
    }
  }

  public async update(id: string, data: UpdateUser): Promise<User> {
    try {
      return await this.prisma.user.update({ where: { id }, data });
    } catch (error) {
      handleDBError(error, "Failed to update user");
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      handleDBError(error, "Failed to delete user");
    }
  }
}
