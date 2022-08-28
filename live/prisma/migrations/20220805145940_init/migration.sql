-- CreateTable
CREATE TABLE `IP` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(191) NOT NULL,
    `ora_data` DATETIME(3) NOT NULL,
    `userID` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locatie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(191) NOT NULL,
    `lat` VARCHAR(191) NOT NULL,
    `lng` VARCHAR(191) NOT NULL,
    `acc` VARCHAR(191) NOT NULL,
    `viteza` VARCHAR(191) NOT NULL,
    `directie` VARCHAR(191) NOT NULL,
    `ora_data` DATETIME(3) NOT NULL,
    `userID` INTEGER NULL,
    `thjucID` INTEGER NULL,
    `indID` INTEGER NULL,

    UNIQUE INDEX `Locatie_userID_key`(`userID`),
    UNIQUE INDEX `Locatie_thjucID_key`(`thjucID`),
    UNIQUE INDEX `Locatie_indID_key`(`indID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `nume` VARCHAR(191) NULL,
    `telefon` VARCHAR(191) NULL,
    `data_nasterii` DATETIME(3) NULL,
    `grad` ENUM('NEAPROBAT', 'VOLUNTAR', 'SPONSOR', 'MEMBRU', 'PARTENER', 'MENTOR', 'BOARD', 'TEAM_LEADER_TEHNIC', 'TEAM_LEADER_NON_TEHNIC', 'TEAM_LEADER', 'MINA') NOT NULL DEFAULT 'NEAPROBAT',
    `departament` ENUM('NEREPARTIZAT', 'MECANICA', 'PROGRAMARE', 'DESIGN', 'MEDIA') NOT NULL DEFAULT 'NEREPARTIZAT',
    `incredere` INTEGER NOT NULL DEFAULT 0,
    `primaLogare` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ultimaActiune` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
CREATE TABLE `Jucator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sid` VARCHAR(191) NOT NULL,
    `nume` VARCHAR(191) NULL,
    `creator` VARCHAR(191) NOT NULL,
    `start` ENUM('AVRAMIDE', 'ACVARIU', 'ARTA', 'ISTORIE') NOT NULL,
    `telefon` VARCHAR(191) NULL,
    `viteza` DOUBLE NOT NULL DEFAULT 0,
    `muzee` JSON NOT NULL,
    `feedback` INTEGER NOT NULL DEFAULT -1,

    UNIQUE INDEX `Jucator_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IndiciuMeta` (
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
CREATE TABLE `Indiciu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creator` VARCHAR(191) NOT NULL,
    `intrebare` VARCHAR(191) NOT NULL,
    `raspuns` VARCHAR(191) NOT NULL,
    `poza` LONGTEXT NOT NULL,
    `arataPoza` BOOLEAN NOT NULL DEFAULT false,
    `arataForma` BOOLEAN NOT NULL DEFAULT false,
    `lat` VARCHAR(191) NOT NULL,
    `lng` VARCHAR(191) NOT NULL,
    `acc` VARCHAR(191) NOT NULL,
    `etajID` INTEGER NULL,

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

-- AddForeignKey
ALTER TABLE `IP` ADD CONSTRAINT `IP_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locatie` ADD CONSTRAINT `Locatie_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `IndiciuMeta` ADD CONSTRAINT `IndiciuMeta_jucatorId_fkey` FOREIGN KEY (`jucatorId`) REFERENCES `Jucator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IndiciuMeta` ADD CONSTRAINT `IndiciuMeta_indiciuId_fkey` FOREIGN KEY (`indiciuId`) REFERENCES `Indiciu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Indiciu` ADD CONSTRAINT `Indiciu_etajID_fkey` FOREIGN KEY (`etajID`) REFERENCES `Etaj`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
