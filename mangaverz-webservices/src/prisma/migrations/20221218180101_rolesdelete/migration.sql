/*
  Warnings:

  - You are about to drop the column `rolesId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_rolesId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `rolesId`;

-- DropTable
DROP TABLE `roles`;
