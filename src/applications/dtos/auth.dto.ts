import { Session, User } from "@prisma/client";

export const authDTO = {
  forRegister(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  },
  forLogin(user: User, session: Session) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: session.id,
    };
  },
};
