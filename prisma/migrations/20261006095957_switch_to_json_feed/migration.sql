/*
  Warnings:

  - You are about to drop the column `issueNumber` on the `JobListing` table. All the data in the column will be lost.
  - You are about to drop the column `repo` on the `JobListing` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `JobListing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[source,externalId]` on the table `JobListing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `JobListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `JobListing` table without a default value. This is not possible if the table is not empty.
  - Made the column `company` on table `JobListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `JobListing` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "JobListing_repo_issueNumber_key";

-- AlterTable
ALTER TABLE "JobListing" DROP COLUMN "issueNumber",
DROP COLUMN "repo",
DROP COLUMN "title",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "source" TEXT NOT NULL,
ALTER COLUMN "company" SET NOT NULL,
ALTER COLUMN "position" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JobListing_source_externalId_key" ON "JobListing"("source", "externalId");
