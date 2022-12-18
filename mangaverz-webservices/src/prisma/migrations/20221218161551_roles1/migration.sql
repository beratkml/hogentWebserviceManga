/*
  Warnings:

  - You are about to drop the column `admin` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `normal` on the `role` table. All the data in the column will be lost.
  - Added the required column `name` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `role` DROP COLUMN `admin`,
    DROP COLUMN `normal`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
