import { Session } from "@prisma/client";

export interface ISession {
  getOne(id: string): Promise<Session | null>;
  create(userId: string): Promise<Session>;
  delete(id: string): Promise<void>;
}
