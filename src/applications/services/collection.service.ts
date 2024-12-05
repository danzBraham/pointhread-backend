import "reflect-metadata";

import { inject, injectable } from "inversify";

import { CollectionDuplicateError, CollectionNotFoundError } from "@/errors/collection.error";
import {
  CreateCollection,
  UpdateCollection,
} from "@/infrastructure/interfaces/collection.interface";
import { CollectionRepository } from "@/infrastructure/repositories/collection.repository";
import { TYPES } from "@/infrastructure/types";

@injectable()
export class CollectionService {
  constructor(@inject(TYPES.collectionRepo) private readonly collectionRepo: CollectionRepository) {
    this.collectionRepo = collectionRepo;
  }

  public async getAll(userId: string) {
    return this.collectionRepo.getAll(userId);
  }

  public async getById(id: string, userId: string) {
    const collection = await this.collectionRepo.getById(id, userId);
    if (!collection) throw new CollectionNotFoundError();
    return collection;
  }

  public async getByName(name: string, userId: string) {
    const collection = await this.collectionRepo.getByName(name, userId);
    if (!collection) throw new CollectionNotFoundError();
    return collection;
  }

  public async create(userId: string, data: CreateCollection) {
    const collection = await this.collectionRepo.getByName(data.name, userId);
    if (collection) throw new CollectionDuplicateError();
    return this.collectionRepo.create(userId, data);
  }

  public async update(id: string, userId: string, data: UpdateCollection) {
    let collection = await this.collectionRepo.getById(id, userId);
    if (!collection) throw new CollectionNotFoundError();

    collection = await this.collectionRepo.getByName(data.name, userId);
    if (collection) throw new CollectionDuplicateError();

    return this.collectionRepo.update(id, userId, data);
  }

  public async delete(id: string, userId: string) {
    const collection = await this.collectionRepo.getById(id, userId);
    if (!collection) throw new CollectionNotFoundError();
    return this.collectionRepo.delete(id, userId);
  }
}
