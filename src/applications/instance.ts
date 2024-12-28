import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";

import { AuthService } from "@/applications/services/auth.service";
import { CollectionRepository } from "@/infrastructure/repositories/collection.repository";
import { SessionRepository } from "@/infrastructure/repositories/session.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { TYPES } from "@/infrastructure/types";

import { CollectionService } from "./services/collection.service";

export const container = new Container();

container.bind(TYPES.prisma).toConstantValue(new PrismaClient());

container.bind(TYPES.userRepo).to(UserRepository);
container.bind(TYPES.sessionRepo).to(SessionRepository);
container.bind(TYPES.collectionRepo).to(CollectionRepository);

container.bind(AuthService).toSelf();
container.bind(CollectionService).toSelf();

export const authService = container.get<AuthService>(AuthService);
export const collectionService = container.get<CollectionService>(CollectionService);
