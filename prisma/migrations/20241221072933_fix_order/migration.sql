/*
  Warnings:

  - You are about to drop the `orderproductuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orderproductuser` DROP FOREIGN KEY `OrderProductUser_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `productorder` DROP FOREIGN KEY `ProductOrder_orderId_fkey`;

-- DropTable
DROP TABLE `orderproductuser`;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `TotalCost` INTEGER NOT NULL DEFAULT 0,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOrder` ADD CONSTRAINT `ProductOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
