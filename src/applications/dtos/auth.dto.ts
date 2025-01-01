import { Session, User } from "@prisma/client";

export const authDTO = {
  forResponse(user: User, session: Session) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: session.id,
    };
  },
};
