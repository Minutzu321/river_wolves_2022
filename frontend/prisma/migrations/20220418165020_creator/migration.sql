/*
  Warnings:

  - Added the required column `creator` to the `Indiciu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Indiciu` ADD COLUMN `creator` VARCHAR(191) NOT NULL;
