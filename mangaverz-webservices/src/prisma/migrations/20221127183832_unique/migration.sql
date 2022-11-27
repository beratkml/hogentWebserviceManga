/*
  Warnings:

  - The primary key for the `genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `statusreading` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `manga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `mangacollection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `statusreading` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `manga` DROP FOREIGN KEY `Manga_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `mangacollection` DROP FOREIGN KEY `MangaCollection_statusReadingId_fkey`;

-- AlterTable
ALTER TABLE `genre` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `manga` MODIFY `genreId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `mangacollection` MODIFY `statusReadingId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `statusreading` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `genre_id_key` ON `genre`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `manga_id_key` ON `manga`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `mangacollection_id_key` ON `mangacollection`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `statusreading_id_key` ON `statusreading`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_id_key` ON `user`(`id`);

-- AddForeignKey
ALTER TABLE `manga` ADD CONSTRAINT `Manga_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mangacollection` ADD CONSTRAINT `MangaCollection_statusReadingId_fkey` FOREIGN KEY (`statusReadingId`) REFERENCES `statusreading`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
