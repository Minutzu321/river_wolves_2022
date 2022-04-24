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
    `grad` ENUM('NEAPROBAT', 'VOLUNTAR', 'MEMBRU', 'PARTENER', 'BOARD', 'TEAM_LEADER_TEHNIC', 'TEAM_LEADER_NON_TEHNIC', 'TEAM_LEADER', 'MINA') NOT NULL DEFAULT 'NEAPROBAT',
    `departament` ENUM('NEREPARTIZAT', 'MECANICA', 'PROGRAMARE', 'DESIGN', 'MEDIA') NOT NULL DEFAULT 'NEREPARTIZAT',
    `incredere` INTEGER NOT NULL DEFAULT 0,
    `primaLogare` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ultimaActiune` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jucator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sid` VARCHAR(191) NOT NULL,
    `nume` VARCHAR(191) NULL,
    `telefon` VARCHAR(191) NULL,
    `viteza` DOUBLE NOT NULL,
    `primulIndiciu` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Jucator_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IndiciuMeta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timp` DATETIME(3) NOT NULL,
    `timpRezolvat` DATETIME(3) NOT NULL,
    `rezolvat` BOOLEAN NOT NULL DEFAULT false,
    `sarit` BOOLEAN NOT NULL DEFAULT false,
    `jucatorId` INTEGER NULL,
    `indiciuId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Indiciu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intrebare` VARCHAR(191) NOT NULL,
    `raspuns` VARCHAR(191) NOT NULL,
    `poza` VARCHAR(191) NOT NULL,
    `arataPoza` BOOLEAN NOT NULL DEFAULT false,
    `lat` VARCHAR(191) NOT NULL,
    `lng` VARCHAR(191) NOT NULL,
    `acc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pozitie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `muzeu` ENUM('AVRAMIDE', 'ACVARIU', 'ARTA', 'ISTORIE') NOT NULL,
    `etaj` VARCHAR(191) NOT NULL,
    `indiciuID` INTEGER NULL,

    UNIQUE INDEX `Pozitie_indiciuID_key`(`indiciuID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IP` ADD CONSTRAINT `IP_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locatie` ADD CONSTRAINT `Locatie_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IndiciuMeta` ADD CONSTRAINT `IndiciuMeta_jucatorId_fkey` FOREIGN KEY (`jucatorId`) REFERENCES `Jucator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IndiciuMeta` ADD CONSTRAINT `IndiciuMeta_indiciuId_fkey` FOREIGN KEY (`indiciuId`) REFERENCES `Indiciu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pozitie` ADD CONSTRAINT `Pozitie_indiciuID_fkey` FOREIGN KEY (`indiciuID`) REFERENCES `Indiciu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
