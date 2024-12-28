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

import { collectionDTO } from "../dtos/collection.dto";

@injectable()
export class CollectionService {
  private collectionRepo: CollectionRepository;

  constructor(@inject(TYPES.collectionRepo) collectionRepo: CollectionRepository) {
    this.collectionRepo = collectionRepo;
  }

  public async getAll(userId: string) {
    const collections = await this.collectionRepo.getAll(userId);
    return collections.map((collection) => collectionDTO.forResponse(collection));
  }

  public async getOne(id: string, userId: string) {
    const collection = await this.collectionRepo.getOne(id, userId);
    if (!collection) {
      throw new NotFoundError("Collection not found");
    }

    return collectionDTO.forResponse(collection);
  }

  public async create(userId: string, data: CollectionCreateRequest) {
    const collection = await this.collectionRepo.getOneByName(data.name, userId);
    if (collection) {
      throw new DuplicateError("Collection already exists");
    }

    const slug = generateSlug(data.name);
    const newCollection = await this.collectionRepo.create({ name: data.name, slug, userId });

    return collectionDTO.forResponse(newCollection);
  }

  public async update(id: string, userId: string, data: CollectionUpdateRequest) {
    const collection = await this.collectionRepo.getOneByName(data.name, userId);
    if (collection) {
      throw new DuplicateError("Collection already exists");
    }

    const slug = generateSlug(data.name);
    const updatedCollection = await this.collectionRepo.update(id, userId, { ...data, slug });

    return collectionDTO.forResponse(updatedCollection);
  }

  public async delete(id: string, userId: string) {
    const collection = await this.collectionRepo.getOne(id, userId);
    if (!collection) {
      throw new NotFoundError("Collection not found");
    }
    return this.collectionRepo.delete(id, userId);
  }
}
