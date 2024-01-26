/*
  Warnings:

  - You are about to drop the `DOCUMENT` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `DOCUMENT`;

-- CreateTable
CREATE TABLE `document` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;