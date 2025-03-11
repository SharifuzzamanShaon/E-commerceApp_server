-- CreateTable
CREATE TABLE "_ProductSubCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductSubCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductSubCategories_B_index" ON "_ProductSubCategories"("B");

-- AddForeignKey
ALTER TABLE "_ProductSubCategories" ADD CONSTRAINT "_ProductSubCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductSubCategories" ADD CONSTRAINT "_ProductSubCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategroy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
