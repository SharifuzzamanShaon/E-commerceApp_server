-- CreateEnum
CREATE TYPE "Color" AS ENUM ('RED', 'GREEN', 'BLUE', 'YELLOW', 'ORANGE', 'PURPLE', 'PINK', 'BLACK', 'WHITE', 'GRAY');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" "Color"[],
ADD COLUMN     "size" "Size"[];
