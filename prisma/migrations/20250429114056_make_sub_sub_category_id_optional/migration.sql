/*
  Warnings:

  - Added the required column `updatedAt` to the `SubSubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "subCategoryId" TEXT;

-- AlterTable
ALTER TABLE "SubSubCategory" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategroy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
