-- CreateTable
CREATE TABLE "JobListing" (
    "id" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "issueNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT,
    "position" TEXT,
    "url" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,

    CONSTRAINT "JobListing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobListing_applicationId_key" ON "JobListing"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "JobListing_repo_issueNumber_key" ON "JobListing"("repo", "issueNumber");

-- AddForeignKey
ALTER TABLE "JobListing" ADD CONSTRAINT "JobListing_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
