-- CreateTable
CREATE TABLE `USER` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('normal', 'google', 'kakao') NOT NULL DEFAULT 'normal',
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `USER_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `INQUIRY` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(191) NOT NULL,
    `inquiry_content` VARCHAR(191) NOT NULL,
    `status` ENUM('wait', 'complete') NOT NULL DEFAULT 'wait',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SEARCH_HISTORY` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `search` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DOCUMENT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `INQUIRY` ADD CONSTRAINT `INQUIRY_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `USER`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SEARCH_HISTORY` ADD CONSTRAINT `SEARCH_HISTORY_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `USER`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
