-- DropForeignKey
ALTER TABLE `inquiry` DROP FOREIGN KEY `INQUIRY_user_email_fkey`;

-- DropForeignKey
ALTER TABLE `search_history` DROP FOREIGN KEY `SEARCH_HISTORY_user_email_fkey`;

-- AddForeignKey
ALTER TABLE `inquiry` ADD CONSTRAINT `inquiry_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `search_history` ADD CONSTRAINT `search_history_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `USER_email_key` TO `user_email_key`;
