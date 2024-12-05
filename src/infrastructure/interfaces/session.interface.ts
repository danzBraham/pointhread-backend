import { Session, User } from "@prisma/client";

export interface ISession {
  getById(id: string): Promise<Session | null>;
  create(data: Pick<User, "id">): Promise<Session>;
  delete(id: string): Promise<Session | null>;
}
