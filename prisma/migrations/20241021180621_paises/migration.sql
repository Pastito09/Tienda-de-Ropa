-- CreateTable
CREATE TABLE "Countries" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Countries_name_key" ON "Countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_id_key" ON "Countries"("id");
