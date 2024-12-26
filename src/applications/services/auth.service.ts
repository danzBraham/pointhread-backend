import "reflect-metadata";

import { inject, injectable } from "inversify";

import { LoginRequest, RegisterRequest } from "@/infrastructure/entities/user.entity";
import {
  AuthorizationError,
  BadRequestError,
  DuplicateError,
  NotFoundError,
} from "@/infrastructure/errors";
import { SessionRepository } from "@/infrastructure/repositories/session.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { TYPES } from "@/infrastructure/types";

import { authDTO } from "../dtos/auth.dto";

@injectable()
export class AuthService {
  private userRepo: UserRepository;
  private sessionRepo: SessionRepository;

  constructor(
    @inject(TYPES.userRepo) userRepo: UserRepository,
    @inject(TYPES.sessionRepo) sessionRepo: SessionRepository
  ) {
    this.userRepo = userRepo;
    this.sessionRepo = sessionRepo;
  }

  public async register({ username, email, password }: RegisterRequest) {
    const user = await this.userRepo.getOneByEmail(email);
    if (user) {
      throw new DuplicateError("User already exists");
    }

    const hashedPassword = await Bun.password.hash(password, "argon2id");

    const newUser = await this.userRepo.create({
      username,
      email,
      password: hashedPassword,
      avatarUrl: "",
      authProvider: "EMAIL",
    });

    return authDTO.forRegister(newUser);
  }

  public async login({ email, password }: LoginRequest) {
    const user = await this.userRepo.getOneByEmail(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (!user.password) {
      throw new BadRequestError("Invalid credentials");
    }

    const isPasswordValid = await Bun.password.verify(password, user.password, "argon2id");
    if (!isPasswordValid) {
      throw new BadRequestError("Invalid credentials");
    }

    const token = await this.sessionRepo.create(user.id);

    return authDTO.forLogin(user, token);
  }

  public async logout(sessionId: string | undefined) {
    console.log({ sessionId });
    if (!sessionId) {
      throw new AuthorizationError("Session not provided");
    }
    await this.sessionRepo.delete(sessionId);
  }

  public async verifySession(sessionId: string) {
    const session = await this.sessionRepo.getOne(sessionId);
    if (!session) {
      throw new AuthorizationError("Invalid session");
    }
    return "valid";
  }

  public async decodeSession(sessionId: string) {
    const session = await this.sessionRepo.getOne(sessionId);
    if (!session) {
      throw new AuthorizationError("Invalid session");
    }

    const user = await this.userRepo.getOne(session.userId);
    if (!user) {
      throw new AuthorizationError("Invalid session");
    }

    return { user };
  }
}
