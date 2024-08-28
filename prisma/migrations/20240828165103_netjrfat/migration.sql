/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[gitUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gitUserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "updatedAt",
ADD COLUMN     "gitUserId" TEXT NOT NULL,
ADD COLUMN     "lamportsEarned" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lamportsLeft" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "solanaAddress" TEXT,
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationRequest";

-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL,
    "gitRepoId" TEXT NOT NULL,
    "repoOwnerId" TEXT NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "totalContributors" INTEGER NOT NULL,
    "currentContributors" INTEGER NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Repository_gitRepoId_key" ON "Repository"("gitRepoId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_repoOwnerId_key" ON "Repository"("repoOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_gitUserId_key" ON "User"("gitUserId");
