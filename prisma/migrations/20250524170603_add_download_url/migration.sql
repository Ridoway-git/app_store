/*
  Warnings:

  - Added the required column `downloadUrl` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_App" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "headerImage" TEXT NOT NULL,
    "screenshots" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "downloads" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "developer" TEXT NOT NULL,
    "downloadUrl" TEXT NOT NULL DEFAULT 'https://example.com/download',
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "App_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_App" ("categoryId", "content", "createdAt", "description", "developer", "downloads", "features", "headerImage", "icon", "id", "name", "rating", "screenshots", "size", "slug", "updatedAt", "version") SELECT "categoryId", "content", "createdAt", "description", "developer", "downloads", "features", "headerImage", "icon", "id", "name", "rating", "screenshots", "size", "slug", "updatedAt", "version" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
CREATE UNIQUE INDEX "App_slug_key" ON "App"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
