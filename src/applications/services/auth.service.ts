import "reflect-metadata";

import { inject, injectable } from "inversify";

import {
  DuplicateUserError,
  InvalidCredentialsError,
  SessionNotFoundError,
  UserNotFoundError,
} from "@/errors";
import { LoginUser, RegisterUser } from "@/infrastructure/interfaces/user.interface";
import { SessionRepository } from "@/infrastructure/repositories/session.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { TYPES } from "@/infrastructure/types";

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

  public async register({ username, email, password }: RegisterUser) {
    const user = await this.userRepo.getByEmail(email);
    if (user) throw new DuplicateUserError();

    if (!password) throw new InvalidCredentialsError();
    const hashedPassword = await Bun.password.hash(password, "argon2id");

    const newUser = await this.userRepo.create({
      username,
      email,
      password: hashedPassword,
      avatarUrl: "",
      authProvider: "EMAIL",
    });
    const token = await this.sessionRepo.create(newUser);

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      accessToken: token.id,
    };
  }

  public async login({ email, password }: LoginUser) {
    const user = await this.userRepo.getByEmail(email);
    if (!user) throw new UserNotFoundError();

    if (!user.password) throw new InvalidCredentialsError();
    const isPasswordValid = await Bun.password.verify(password, user.password, "argon2id");
    if (!isPasswordValid) throw new InvalidCredentialsError();

    const token = await this.sessionRepo.create(user);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token.id,
    };
  }

  public async logout(sessionId: string | undefined) {
    if (!sessionId) throw new SessionNotFoundError();
    const session = await this.sessionRepo.delete(sessionId);
    if (!session) throw new SessionNotFoundError();
    return session;
  }

  public async getSession(sessionId: string) {
    const session = await this.sessionRepo.getById(sessionId);
    if (!session) throw new SessionNotFoundError();
    return session;
  }
}
