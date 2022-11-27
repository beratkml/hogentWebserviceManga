/*
  Warnings:

  - The primary key for the `genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `genre` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `genreId` on the `manga` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `manga` DROP FOREIGN KEY `Manga_genreId_fkey`;

-- AlterTable
ALTER TABLE `genre` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `manga` MODIFY `genreId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `manga` ADD CONSTRAINT `Manga_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
