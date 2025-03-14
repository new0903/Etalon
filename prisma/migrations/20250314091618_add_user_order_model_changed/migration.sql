/*
  Warnings:

  - You are about to drop the column `userOrderId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_userOrderId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `userOrderId`;

-- CreateTable
CREATE TABLE `UserOrderProduct` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `user_order_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserOrderProduct` ADD CONSTRAINT `UserOrderProduct_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOrderProduct` ADD CONSTRAINT `UserOrderProduct_user_order_id_fkey` FOREIGN KEY (`user_order_id`) REFERENCES `UserOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
