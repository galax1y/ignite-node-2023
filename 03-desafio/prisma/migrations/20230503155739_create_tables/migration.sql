-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "name_accountable" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "age" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "independence" INTEGER NOT NULL,
    "adopted_at" DATETIME,
    "orgId" TEXT NOT NULL,
    CONSTRAINT "Pet_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Org_email_key" ON "Org"("email");
