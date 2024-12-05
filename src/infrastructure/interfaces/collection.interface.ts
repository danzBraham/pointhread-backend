import { Collection } from "@prisma/client";

export type CreateCollection = Pick<Collection, "name">;
export type UpdateCollection = Pick<Collection, "name">;

export type CollectionResponse = Pick<Collection, "id" | "name" | "createdAt" | "updatedAt">;
export type CollectionBasicResponse = Pick<Collection, "id" | "name">;

export interface ICollection {
  getAll(userId: string): Promise<CollectionResponse[]>;
  getById(id: string, userId: string): Promise<CollectionResponse | null>;
  getByName(name: string, userId: string): Promise<CollectionResponse | null>;
  create(
    userId: string,
    data: CreateCollection
  ): Promise<Pick<Collection, "id" | "name" | "createdAt">>;
  update(
    id: string,
    userId: string,
    data: UpdateCollection
  ): Promise<Pick<Collection, "id" | "name" | "updatedAt">>;
  delete(id: string, userId: string): Promise<CollectionBasicResponse | null>;
}
