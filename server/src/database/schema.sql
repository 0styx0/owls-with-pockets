SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS stacks;

USE stacks;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` char(20) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `password` text NOT NULL /* in the future, bcript max length=72 so can switch to char72 */
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE IF NOT EXISTS `games` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` char(30) NOT NULL,
  `data` text NOT NULL, /* json, but server doesn't know the structure */
  `created` TIMESTAMP(0),
  `creator_id` INTEGER NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS `matches` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `game_id` char(30) NOT NULL,
  `person1` INTEGER,
  `person2` INTEGER,
  `matched` BOOLEAN,
  FOREIGN KEY (person1) REFERENCES users(id),
  FOREIGN KEY (person2) REFERENCES users(id)
);
