-- DropForeignKey
ALTER TABLE `manga` DROP FOREIGN KEY `Manga_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `mangacollection` DROP FOREIGN KEY `MangaCollection_mangaId_fkey`;

-- DropForeignKey
ALTER TABLE `mangacollection` DROP FOREIGN KEY `MangaCollection_statusReadingId_fkey`;

-- DropForeignKey
ALTER TABLE `mangacollection` DROP FOREIGN KEY `MangaCollection_userId_fkey`;

-- DropIndex
DROP INDEX `manga_id_key` ON `manga`;

-- AddForeignKey
ALTER TABLE `manga` ADD CONSTRAINT `Manga_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mangacollection` ADD CONSTRAINT `MangaCollection_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `manga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mangacollection` ADD CONSTRAINT `MangaCollection_statusReadingId_fkey` FOREIGN KEY (`statusReadingId`) REFERENCES `statusreading`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mangacollection` ADD CONSTRAINT `MangaCollection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
