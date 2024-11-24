/*
  Warnings:

  - You are about to drop the `productimage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ImgUrls` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `productimage` DROP FOREIGN KEY `ProductImage_product_id_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `ImgUrls` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `productimage`;
