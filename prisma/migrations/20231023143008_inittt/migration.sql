/*
  Warnings:

  - You are about to drop the `ItemOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quantity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemOptions" DROP CONSTRAINT "ItemOptions_itemId_fkey";

-- DropForeignKey
ALTER TABLE "quantity" DROP CONSTRAINT "quantity_id_fkey";

-- DropTable
DROP TABLE "ItemOptions";

-- DropTable
DROP TABLE "quantity";

-- DropEnum
DROP TYPE "Color";

-- CreateTable
CREATE TABLE "Color" (
    "itemId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sizes" TEXT[],

    CONSTRAINT "Color_pkey" PRIMARY KEY ("itemId")
);

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
