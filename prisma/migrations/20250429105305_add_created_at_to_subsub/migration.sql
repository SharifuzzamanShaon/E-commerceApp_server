/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_ProductToSubCategroy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToSubSubCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSubCategroy" DROP CONSTRAINT "_ProductToSubCategroy_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSubCategroy" DROP CONSTRAINT "_ProductToSubCategroy_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSubSubCategory" DROP CONSTRAINT "_ProductToSubSubCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSubSubCategory" DROP CONSTRAINT "_ProductToSubSubCategory_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
ADD COLUMN     "subSubCategoryId" TEXT;

-- AlterTable
ALTER TABLE "SubSubCategory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_ProductToSubCategroy";

-- DropTable
DROP TABLE "_ProductToSubSubCategory";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subSubCategoryId_fkey" FOREIGN KEY ("subSubCategoryId") REFERENCES "SubSubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
