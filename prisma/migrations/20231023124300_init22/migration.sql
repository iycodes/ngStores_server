-- CreateEnum
CREATE TYPE "promotion" AS ENUM ('NONE', 'HOMETAB1', 'HOMEPAGE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BUYER', 'SELLER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MEN', 'WOMEN', 'BOYS', 'GIRLS');

-- CreateEnum
CREATE TYPE "lol" AS ENUM ('LOL', 'OLO');

-- CreateEnum
CREATE TYPE "SubCategory" AS ENUM ('SHIRTS', 'CORDUROY_SHIRT', 'POlO', 'T_SHIRTS', 'OFFICE_SHIRT', 'VINTAGE', 'BEACH', 'SWEATSHIRT', 'JACKETS', 'JEAN_JACKET', 'LEATHER_JACKET', 'BLAZER', 'PUFFER_JACKET', 'TROUSERS', 'OFFICE_TROUSER', 'JEANS_REGULAR', 'JEANS_BAGGY', 'JEANS_TIGHT', 'CARGO_PANTS', 'LEGGINS', 'JOGGERS', 'PLAY_PANTS', 'CORDUROY_TROUSER', 'CHINOS_TROUSER', 'PALAZZO', 'SHORTS', 'CARGO_SHORTS', 'BOXERS', 'BEACH_SHORT', 'CORDUROY_SHORT', 'SKIRTS', 'MINI_SKIRT', 'JEAN_SKIRT', 'BAGS', 'PYJAMAS', 'SUIT');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FASHION', 'GROCERY', 'HEALTH_BEAUTY', 'AUTOMOBILE', 'GAMING', 'COMPUTING', 'PHONES_TABLETS');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('WHITE', 'OFFWHITE', 'BLACK', 'DARK_GREY', 'GREY', 'RED');

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "pwHash" TEXT NOT NULL,
    "pwSalt" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Role" NOT NULL DEFAULT 'BUYER',
    "savedItems" TEXT[],
    "storeName" TEXT,
    "itemCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Order" (
    "buyerId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "size" "Size",
    "numberSize" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Cart" (
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("ownerId")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "cartId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "size" "Size",
    "numberSize" INTEGER,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "category" "Category" NOT NULL,
    "subCategory" "SubCategory",
    "image" TEXT NOT NULL,
    "images" TEXT[],
    "promotion" "promotion" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemOptions" (
    "itemId" TEXT NOT NULL,
    "color" TEXT,
    "size" "Size",

    CONSTRAINT "ItemOptions_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "quantity" (
    "id" TEXT NOT NULL,
    "S" INTEGER,
    "M" INTEGER,
    "L" INTEGER,
    "XL" INTEGER,
    "XXL" INTEGER,
    "XXXL" INTEGER,

    CONSTRAINT "quantity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "itemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("itemId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemOptions" ADD CONSTRAINT "ItemOptions_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quantity" ADD CONSTRAINT "quantity_id_fkey" FOREIGN KEY ("id") REFERENCES "ItemOptions"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
