/*
  Warnings:

  - You are about to drop the `properties` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shopcartuser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `properties` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `properties` DROP FOREIGN KEY `Properties_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `shopcartuser` DROP FOREIGN KEY `shopCartUser_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `shopcartuser` DROP FOREIGN KEY `shopCartUser_user_id_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `properties` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `properties`;

-- DropTable
DROP TABLE `shopcartuser`;
