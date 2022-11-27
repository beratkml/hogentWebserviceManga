/*
  Warnings:

  - You are about to alter the column `statusReadingId` on the `mangacollection` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `statusreading` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `statusreading` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `mangacollection` DROP FOREIGN KEY `MangaCollection_statusReadingId_fkey`;

-- AlterTable
ALTER TABLE `mangacollection` MODIFY `statusReadingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `statusreading` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `mangacollection` ADD CONSTRAINT `MangaCollection_statusReadingId_fkey` FOREIGN KEY (`statusReadingId`) REFERENCES `statusreading`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
