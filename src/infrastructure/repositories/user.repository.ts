import "reflect-metadata";

import { PrismaClient, User } from "@prisma/client";
import { injectable } from "inversify";

import { InsertUser, IUser, UpdateUser } from "@/infrastructure/interfaces/user.interface";
import { prisma } from "@/infrastructure/utils/prisma";

@injectable()
export class UserRepository implements IUser {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public async getById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  public async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  public async create(
    user: InsertUser
  ): Promise<Pick<User, "id" | "username" | "email" | "createdAt">> {
    return await this.prisma.user.create({
      data: user,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });
  }

  public async update(
    id: string,
    user: UpdateUser
  ): Promise<Pick<User, "id" | "username" | "email" | "updatedAt">> {
    return await this.prisma.user.update({
      where: { id },
      data: user,
      select: {
        id: true,
        username: true,
        email: true,
        updatedAt: true,
      },
    });
  }
  public async delete(id: string): Promise<User | null> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
