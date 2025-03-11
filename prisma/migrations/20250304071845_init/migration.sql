/*
  Warnings:

  - You are about to drop the `_ProductSubCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductSubCategories" DROP CONSTRAINT "_ProductSubCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductSubCategories" DROP CONSTRAINT "_ProductSubCategories_B_fkey";

-- DropTable
DROP TABLE "_ProductSubCategories";
