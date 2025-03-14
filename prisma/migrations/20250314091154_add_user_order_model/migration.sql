/*
  Warnings:

  - You are about to drop the `storyorders` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `userOrderId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `storyorders`;

-- CreateTable
CREATE TABLE `UserOrder` (
    `id` VARCHAR(191) NOT NULL,
    `userToken` VARCHAR(191) NOT NULL,
    `totalPrice` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_userOrderId_fkey` FOREIGN KEY (`userOrderId`) REFERENCES `UserOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
