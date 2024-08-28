-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gitUserId" TEXT NOT NULL,
    "name" TEXT,
    "solanaAddress" TEXT,
    "lamportsEarned" INTEGER NOT NULL DEFAULT 0,
    "lamportsLeft" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_gitUserId_key" ON "User"("gitUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_gitRepoId_key" ON "Repository"("gitRepoId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_repoOwnerId_key" ON "Repository"("repoOwnerId");
