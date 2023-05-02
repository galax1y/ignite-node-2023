-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "age" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "independence" INTEGER NOT NULL,
    "is_adopted" BOOLEAN DEFAULT false,
    "organizationId" TEXT NOT NULL,
    CONSTRAINT "Pet_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("age", "energy", "id", "independence", "is_adopted", "organizationId", "size") SELECT "age", "energy", "id", "independence", "is_adopted", "organizationId", "size" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
