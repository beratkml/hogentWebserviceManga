/*
  Warnings:

  - You are about to drop the column `userId` on the `role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `role` DROP FOREIGN KEY `role_userId_fkey`;

-- AlterTable
ALTER TABLE `role` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `roleId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
