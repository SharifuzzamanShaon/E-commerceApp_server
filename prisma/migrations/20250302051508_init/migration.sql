-- CreateTable
CREATE TABLE "SubCategroy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentCategory" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubCategroy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSubCategroy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductToSubCategroy_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubCategroy_name_key" ON "SubCategroy"("name");

-- CreateIndex
CREATE INDEX "_ProductToSubCategroy_B_index" ON "_ProductToSubCategroy"("B");

-- AddForeignKey
ALTER TABLE "SubCategroy" ADD CONSTRAINT "SubCategroy_parentCategory_fkey" FOREIGN KEY ("parentCategory") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSubCategroy" ADD CONSTRAINT "_ProductToSubCategroy_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSubCategroy" ADD CONSTRAINT "_ProductToSubCategroy_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategroy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
