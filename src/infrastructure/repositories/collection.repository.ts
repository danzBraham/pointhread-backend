import "reflect-metadata";

import { Collection, PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

import {
  CollectionBasicResponse,
  CollectionResponse,
  CreateCollection,
  ICollection,
  UpdateCollection,
} from "@/infrastructure/interfaces/collection.interface";
import { prisma } from "@/infrastructure/utils/prisma";

@injectable()
export class CollectionRepository implements ICollection {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public async getAll(userId: string): Promise<CollectionResponse[]> {
    return this.prisma.collection.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  public async getById(id: string, userId: string): Promise<CollectionResponse | null> {
    return this.prisma.collection.findUnique({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  public async getByName(name: string, userId: string): Promise<CollectionResponse | null> {
    return this.prisma.collection.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        userId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  public async create(
    userId: string,
    data: CreateCollection
  ): Promise<Pick<Collection, "id" | "name" | "createdAt">> {
    return this.prisma.collection.create({
      data: {
        name: data.name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  }

  public async update(
    id: string,
    userId: string,
    data: UpdateCollection
  ): Promise<Pick<Collection, "id" | "name" | "updatedAt">> {
    return this.prisma.collection.update({
      where: {
        id,
        userId,
      },
      data: {
        name: data.name,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  public async delete(id: string, userId: string): Promise<CollectionBasicResponse | null> {
    return this.prisma.collection.delete({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
