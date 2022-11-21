/*
  Warnings:

  - You are about to drop the `abc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `abc`;

-- CreateTable
CREATE TABLE `genre` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manga` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `chapters` INTEGER NOT NULL,
    `isFinished` BOOLEAN NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `release_date` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `genreId` VARCHAR(191) NOT NULL,

    INDEX `Manga_genreId_fkey`(`genreId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mangacollection` (
    `id` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `current_chapter` INTEGER NOT NULL,
    `mangaId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `statusReadingId` VARCHAR(191) NOT NULL,

    INDEX `MangaCollection_mangaId_fkey`(`mangaId`),
    INDEX `MangaCollection_statusReadingId_fkey`(`statusReadingId`),
    INDEX `MangaCollection_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statusreading` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `manga` ADD CONSTRAINT `Manga_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mangacollection` ADD CONSTRAINT `MangaCollection_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `manga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mangacollection` ADD CONSTRAINT `MangaCollection_statusReadingId_fkey` FOREIGN KEY (`statusReadingId`) REFERENCES `statusreading`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mangacollection` ADD CONSTRAINT `MangaCollection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
