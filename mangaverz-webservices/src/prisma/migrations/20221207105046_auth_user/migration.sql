/*
  Warnings:

  - Added the required column `authid` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `authid` VARCHAR(191) NOT NULL;
