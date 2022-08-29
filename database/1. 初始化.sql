CREATE DATABASE IF NOT EXISTS `GameMapper`;

/* 评价 */
CREATE TABLE IF NOT EXISTS `evaluation` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `pos_num` INT UNSIGNED DEFAULT 0,
    `neg_num` INT UNSIGNED DEFAULT 0
);

/* 位置 */
CREATE TABLE IF NOT EXISTS `location` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `x` DOUBLE,
    `y` DOUBLE
);

/* 类型 */
CREATE TABLE IF NOT EXISTS `type` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR (128),
    `type` INT UNSIGNED DEFAULT 0
);

/* 讯息表 */
CREATE TABLE IF NOT EXISTS `message` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR (128) NOT NULL,
    `desc` VARCHAR (1024),
    `loc_id` INT UNSIGNED,
    FOREIGN KEY (`loc_id`) REFERENCES location (id),
    `type_id` INT UNSIGNED,
    FOREIGN KEY (`type_id`) REFERENCES type (id),
    `eval_id` INT UNSIGNED,
    FOREIGN KEY (`eval_id`) REFERENCES evaluation (id),
    `create_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `update_date` DATETIME ON UPDATE CURRENT_TIMESTAMP
);