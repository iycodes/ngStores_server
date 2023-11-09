/*
  Warnings:

  - The `size` column on the `CartItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "color" DROP NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" TEXT;
