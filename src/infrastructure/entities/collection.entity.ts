import { Collection } from "@prisma/client";

export type CreateCollection = Omit<Collection, "id" | "createdAt" | "updatedAt">;
export type UpdateCollection = Partial<Omit<Collection, "id" | "createdAt" | "updatedAt">>;

export interface ICollection {
  getAll(userId: string): Promise<Collection[]>;
  getOne(id: string, userId: string): Promise<Collection | null>;
  getOneByName(name: string, userId: string): Promise<Collection | null>;
  create(data: CreateCollection): Promise<Collection>;
  update(id: string, userId: string, data: UpdateCollection): Promise<Collection>;
  delete(id: string, userId: string): Promise<void>;
}

export interface CollectionCreateRequest {
  name: string;
}

export interface CollectionUpdateRequest {
  name: string;
}
