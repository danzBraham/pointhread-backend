import { Collection } from "@prisma/client";

export const collectionDTO = {
  forResponse(collection: Collection) {
    return {
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
    };
  },
};
