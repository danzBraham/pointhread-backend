export const TYPES = {
  prisma: Symbol.for("PrismaClient"),
  userRepo: Symbol.for("UserRepository"),
  sessionRepo: Symbol.for("SessionRepository"),
  collectionRepo: Symbol.for("CollectionRepository"),
  summarizedThreadRepo: Symbol.for("SummarizedThreadRepository"),
  authService: Symbol.for("AuthService"),
  collectionService: Symbol.for("CollectionService"),
  threadService: Symbol.for("ThreadService"),
};
