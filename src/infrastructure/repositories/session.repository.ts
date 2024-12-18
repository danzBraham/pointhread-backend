import "reflect-metadata";

import { PrismaClient, Session, User } from "@prisma/client";
import { injectable } from "inversify";

import { ISession } from "@/infrastructure/interfaces/session.interface";
import { prisma } from "@/infrastructure/utils/prisma";

@injectable()
export class SessionRepository implements ISession {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public async getById(id: string): Promise<Session | null> {
    return await this.prisma.session.findUnique({ where: { id } });
  }

  public async create(user: Pick<User, "id" | "username">): Promise<Session> {
    return await this.prisma.session.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  public async delete(id: string): Promise<Session | null> {
    return await this.prisma.session.delete({ where: { id } });
  }
}
