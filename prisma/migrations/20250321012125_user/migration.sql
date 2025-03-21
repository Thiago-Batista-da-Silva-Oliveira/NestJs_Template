-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "accessType" TEXT NOT NULL DEFAULT 'USER',
    "provider" TEXT NOT NULL DEFAULT 'LOCAL',
    "providerId" TEXT,
    "refreshToken" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
