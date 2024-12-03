-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'EMAIL');

-- CreateEnum
CREATE TYPE "SummaryType" AS ENUM ('BRIEF', 'DETAILED');

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(25) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(128),
    "avatar_url" VARCHAR(2048),
    "auth_provider" "AuthProvider" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" VARCHAR(25) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" VARCHAR(25) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summarized_threads" (
    "id" VARCHAR(25) NOT NULL,
    "original_content" TEXT NOT NULL,
    "summarized_content" TEXT NOT NULL,
    "original_thread_link" VARCHAR(2048) NOT NULL,
    "summary_type" "SummaryType" NOT NULL,
    "user_id" TEXT NOT NULL,
    "collection_id" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "summarized_threads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summarized_threads" ADD CONSTRAINT "summarized_threads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summarized_threads" ADD CONSTRAINT "summarized_threads_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
