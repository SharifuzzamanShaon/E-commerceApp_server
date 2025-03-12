-- CreateTable
CREATE TABLE "SubSubCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentCategory" TEXT NOT NULL,

    CONSTRAINT "SubSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSubSubCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductToSubSubCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubSubCategory_name_key" ON "SubSubCategory"("name");

-- CreateIndex
CREATE INDEX "_ProductToSubSubCategory_B_index" ON "_ProductToSubSubCategory"("B");

-- AddForeignKey
ALTER TABLE "SubSubCategory" ADD CONSTRAINT "SubSubCategory_parentCategory_fkey" FOREIGN KEY ("parentCategory") REFERENCES "SubCategroy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSubSubCategory" ADD CONSTRAINT "_ProductToSubSubCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSubSubCategory" ADD CONSTRAINT "_ProductToSubSubCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SubSubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
