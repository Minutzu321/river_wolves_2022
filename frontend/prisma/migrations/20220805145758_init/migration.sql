/*
  Warnings:

  - You are about to drop the column `primulIndiciu` on the `Jucator` table. All the data in the column will be lost.
  - You are about to drop the `Pozitie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userID]` on the table `Locatie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[thjucID]` on the table `Locatie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[indID]` on the table `Locatie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creator` to the `Jucator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muzee` to the `Jucator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Jucator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Pozitie` DROP FOREIGN KEY `Pozitie_indiciuID_fkey`;

-- AlterTable
ALTER TABLE `Indiciu` ADD COLUMN `arataForma` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `etajID` INTEGER NULL,
    MODIFY `poza` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `IndiciuMeta` MODIFY `timp` DATETIME(3) NULL,
    MODIFY `timpRezolvat` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Jucator` DROP COLUMN `primulIndiciu`,
    ADD COLUMN `creator` VARCHAR(191) NOT NULL,
    ADD COLUMN `feedback` INTEGER NOT NULL DEFAULT -1,
    ADD COLUMN `muzee` JSON NOT NULL,
    ADD COLUMN `start` ENUM('AVRAMIDE', 'ACVARIU', 'ARTA', 'ISTORIE') NOT NULL,
    MODIFY `viteza` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Locatie` ADD COLUMN `indID` INTEGER NULL,
    ADD COLUMN `thjucID` INTEGER NULL;

-- DropTable
DROP TABLE `Pozitie`;

-- CreateTable
CREATE TABLE `Device` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userAgent` VARCHAR(191) NULL,
    `ultimaActiune` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `seIncarca` BOOLEAN NOT NULL DEFAULT false,
    `nivelBaterie` INTEGER NOT NULL DEFAULT -1,
    `online` BOOLEAN NOT NULL DEFAULT false,
    `jucatorId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `THJucator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sid` VARCHAR(191) NOT NULL,
    `cod` VARCHAR(191) NOT NULL,
    `capitan` VARCHAR(191) NULL,
    `nrJucatori` INTEGER NOT NULL,
    `nrTelefon` VARCHAR(191) NULL,
    `feedback` INTEGER NOT NULL DEFAULT -1,

    UNIQUE INDEX `THJucator_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `THCarteMeta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jucatorId` INTEGER NULL,
    `carteId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `THCarte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `raritate` INTEGER NOT NULL,
    `minPutere` INTEGER NOT NULL,
    `maxPutere` INTEGER NOT NULL,
    `minVieti` INTEGER NOT NULL,
    `maxVieti` INTEGER NOT NULL,
    `entitate` ENUM('VAMPIR', 'VARCOLAC') NOT NULL,
    `extra` ENUM('NIMIC', 'OGLINDA', 'SCUT') NOT NULL DEFAULT 'NIMIC',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `THIndiciu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creator` VARCHAR(191) NOT NULL,
    `intrebare` VARCHAR(191) NOT NULL,
    `raspuns` VARCHAR(191) NOT NULL,
    `poza` VARCHAR(191) NOT NULL,
    `arataPoza` BOOLEAN NOT NULL DEFAULT false,
    `arataForma` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `THIndiciuMeta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timp` DATETIME(3) NULL,
    `timpRezolvat` DATETIME(3) NULL,
    `rezolvat` BOOLEAN NOT NULL DEFAULT false,
    `sarit` BOOLEAN NOT NULL DEFAULT false,
    `jucatorId` INTEGER NULL,
    `indiciuId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etaj` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `muzeu` ENUM('AVRAMIDE', 'ACVARIU', 'ARTA', 'ISTORIE') NOT NULL,
    `etaj` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prajitura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jucatorID` INTEGER NOT NULL,
    `nume` VARCHAR(191) NOT NULL,
    `acceptat` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Prajitura_jucatorID_key`(`jucatorID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Locatie_userID_key` ON `Locatie`(`userID`);

-- CreateIndex
CREATE UNIQUE INDEX `Locatie_thjucID_key` ON `Locatie`(`thjucID`);

-- CreateIndex
CREATE UNIQUE INDEX `Locatie_indID_key` ON `Locatie`(`indID`);

-- AddForeignKey
ALTER TABLE `Locatie` ADD CONSTRAINT `Locatie_thjucID_fkey` FOREIGN KEY (`thjucID`) REFERENCES `THJucator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locatie` ADD CONSTRAINT `Locatie_indID_fkey` FOREIGN KEY (`indID`) REFERENCES `THIndiciu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Device` ADD CONSTRAINT `Device_jucatorId_fkey` FOREIGN KEY (`jucatorId`) REFERENCES `THJucator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `THCarteMeta` ADD CONSTRAINT `THCarteMeta_jucatorId_fkey` FOREIGN KEY (`jucatorId`) REFERENCES `THJucator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `THCarteMeta` ADD CONSTRAINT `THCarteMeta_carteId_fkey` FOREIGN KEY (`carteId`) REFERENCES `THCarte`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `THIndiciuMeta` ADD CONSTRAINT `THIndiciuMeta_jucatorId_fkey` FOREIGN KEY (`jucatorId`) REFERENCES `THJucator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `THIndiciuMeta` ADD CONSTRAINT `THIndiciuMeta_indiciuId_fkey` FOREIGN KEY (`indiciuId`) REFERENCES `THIndiciu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Indiciu` ADD CONSTRAINT `Indiciu_etajID_fkey` FOREIGN KEY (`etajID`) REFERENCES `Etaj`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
