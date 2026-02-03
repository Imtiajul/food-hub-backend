-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_provider_id_fkey";

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
