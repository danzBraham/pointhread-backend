import "reflect-metadata";

import { PrismaClient, Session } from "@prisma/client";
import { inject, injectable } from "inversify";

import { ISession } from "@/infrastructure/entities/session.entity";

import { TYPES } from "../types";
import { handleDBError } from "../utils/db-error-handler";

@injectable()
export class SessionRepository implements ISession {
  private prisma: PrismaClient;

  constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getOne(id: string): Promise<Session | null> {
    try {
      return await this.prisma.session.findUnique({ where: { id } });
    } catch (error) {
      handleDBError(error, "Failed to get session");
    }
  }

  public async create(userId: string): Promise<Session> {
    try {
      return await this.prisma.session.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      handleDBError(error, "Failed to create session");
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.prisma.session.delete({ where: { id } });
    } catch (error) {
      handleDBError(error, "Failed to delete session");
    }
  }
}
