import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";

import { AuthService } from "@/applications/services/auth.service";
import { SessionRepository } from "@/infrastructure/repositories/session.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { TYPES } from "@/infrastructure/types";

export const container = new Container();

container.bind(TYPES.prisma).toConstantValue(new PrismaClient());

container.bind(TYPES.userRepo).to(UserRepository);
container.bind(TYPES.sessionRepo).to(SessionRepository);

container.bind(AuthService).toSelf();

export const authService = container.get<AuthService>(AuthService);
