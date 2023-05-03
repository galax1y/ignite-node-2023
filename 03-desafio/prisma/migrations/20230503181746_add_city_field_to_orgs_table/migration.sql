/*
  Warnings:

  - Added the required column `city` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Org" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "name_accountable" TEXT NOT NULL
);
INSERT INTO "new_Org" ("address", "contact", "email", "id", "name_accountable", "password_hash", "zipcode") SELECT "address", "contact", "email", "id", "name_accountable", "password_hash", "zipcode" FROM "Org";
DROP TABLE "Org";
ALTER TABLE "new_Org" RENAME TO "Org";
CREATE UNIQUE INDEX "Org_email_key" ON "Org"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
