/*
  Warnings:

  - You are about to drop the `propertiessizes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `max` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `propertiessizes` DROP FOREIGN KEY `PropertiesSizes_product_id_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `max` INTEGER NOT NULL,
    ADD COLUMN `min` INTEGER NOT NULL;

-- DropTable
DROP TABLE `propertiessizes`;
