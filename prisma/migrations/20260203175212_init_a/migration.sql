/*
  Warnings:

  - Made the column `provider_id` on table `meals` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_provider_id_fkey";

-- DropIndex
DROP INDEX "meals_name_idx";

-- AlterTable
ALTER TABLE "meals" ALTER COLUMN "provider_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "meals_id_idx" ON "meals"("id");

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
