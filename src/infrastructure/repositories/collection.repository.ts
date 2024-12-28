import "reflect-metadata";

import { Collection, PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { CreateCollection, ICollection, UpdateCollection } from "../entities/collection.entity";
import { TYPES } from "../types";
import { handleDBError } from "../utils/db-error-handler";

@injectable()
export class CollectionRepository implements ICollection {
  private prisma: PrismaClient;

  constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getAll(userId: string): Promise<Collection[]> {
    try {
      return await this.prisma.collection.findMany({ where: { userId } });
    } catch (error) {
      handleDBError(error, "Failed to get all collections");
    }
  }

  public async getOne(id: string, userId: string): Promise<Collection | null> {
    try {
      return await this.prisma.collection.findFirst({ where: { id, userId } });
    } catch (error) {
      handleDBError(error, "Failed to get collection by id");
    }
  }

  public async getOneByName(name: string, userId: string): Promise<Collection | null> {
    try {
      return await this.prisma.collection.findFirst({
        where: {
          name: {
            equals: name,
            mode: "insensitive",
          },
          userId,
        },
      });
    } catch (error) {
      handleDBError(error, "Failed to get collection by name");
    }
  }

  public async create(data: CreateCollection): Promise<Collection> {
    try {
      return await this.prisma.collection.create({ data });
    } catch (error) {
      handleDBError(error, "Failed to create collection");
    }
  }

  public async update(id: string, userId: string, data: UpdateCollection): Promise<Collection> {
    try {
      return await this.prisma.collection.update({ where: { id, userId }, data });
    } catch (error) {
      handleDBError(error, "Failed to update collection");
    }
  }

  public async delete(id: string, userId: string): Promise<void> {
    try {
      await this.prisma.collection.delete({ where: { id, userId } });
    } catch (error) {
      handleDBError(error, "Failed to delete collection");
    }
  }
}
