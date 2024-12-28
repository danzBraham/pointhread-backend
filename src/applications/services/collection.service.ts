import "reflect-metadata";

import { NotFoundError } from "elysia";
import { inject, injectable } from "inversify";

import {
  CollectionCreateRequest,
  CollectionUpdateRequest,
} from "@/infrastructure/entities/collection.entity";
import { DuplicateError } from "@/infrastructure/errors";
import { CollectionRepository } from "@/infrastructure/repositories/collection.repository";
import { TYPES } from "@/infrastructure/types";
import { generateSlug } from "@/infrastructure/utils/slug";

@injectable()
export class CollectionService {
  private collectionRepo: CollectionRepository;

  constructor(@inject(TYPES.collectionRepo) collectionRepo: CollectionRepository) {
    this.collectionRepo = collectionRepo;
  }

  public async getAll(userId: string) {
    return this.collectionRepo.getAll(userId);
  }

  public async getOne(id: string, userId: string) {
    return this.collectionRepo.getOne(id, userId);
  }

  public async create(userId: string, data: CollectionCreateRequest) {
    const collection = await this.collectionRepo.getOneByName(data.name, userId);
    if (collection) {
      throw new DuplicateError("Collection already exists");
    }

    const slug = generateSlug(data.name);

    return this.collectionRepo.create({ name: data.name, slug, userId });
  }

  public async update(id: string, userId: string, data: CollectionUpdateRequest) {
    const collection = await this.collectionRepo.getOneByName(data.name, userId);
    if (collection) {
      throw new DuplicateError("Collection already exists");
    }
    const slug = generateSlug(data.name);

    return this.collectionRepo.update(id, userId, { ...data, slug });
  }

  public async delete(id: string, userId: string) {
    const collection = await this.collectionRepo.getOne(id, userId);
    if (!collection) {
      throw new NotFoundError("Collection not found");
    }
    return this.collectionRepo.delete(id, userId);
  }
}
