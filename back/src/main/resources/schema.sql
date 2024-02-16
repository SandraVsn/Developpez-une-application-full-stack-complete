CREATE TABLE IF NOT EXISTS `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_name` VARCHAR(40),
  `email` VARCHAR(255),
  `password` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `topics` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(40),
  `description` VARCHAR(2000),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(150),
  `content` VARCHAR(2000),
  `topic_id` int,
  `user_id` int,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `comments` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `content` VARCHAR(2000),
  `post_id` int,
  `user_id` int,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `subscription` (
  `user_id` INT, 
  `topic_id` INT
);

ALTER TABLE `posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `posts` ADD FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
ALTER TABLE `subscription` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `subscription` ADD FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`);

INSERT INTO users (id, user_name, email, password)
SELECT 1, 'HackWiz', 'HackWiz@mail.com', '$2a$10$8p7DVGvxRW3Sgd.xuG8pbe1d/OaQdXcnitZhScBzLkkA9O46qPtjW' 
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'HackWiz@mail.com'
);

INSERT INTO users (id, user_name, email, password)
SELECT 2, 'CodeCraftMaster', 'CodeCraftMaster@mail.com', '$2a$10$8p7DVGvxRW3Sgd.xuG8pbe1d/OaQdXcnitZhScBzLkkA9O46qPtjW' 
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'CodeCraftMaster@mail.com'
);

INSERT INTO users (id, user_name, email, password)
SELECT 3, 'DevGeniusHub', 'DevGeniusHub@mail.com', '$2a$10$8p7DVGvxRW3Sgd.xuG8pbe1d/OaQdXcnitZhScBzLkkA9O46qPtjW' 
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'DevGeniusHub@mail.com'
);

INSERT INTO topics (id, name, description)
SELECT 1, 'Web Development', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.' 
WHERE NOT EXISTS (
    SELECT 1 FROM topics WHERE name = 'Web Development'
);
INSERT INTO topics (id, name, description)
SELECT 2, 'Programming Languages', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.' 
WHERE NOT EXISTS (
    SELECT 1 FROM topics WHERE name = 'Programming Languages'
);
INSERT INTO topics (id, name, description)
SELECT 3, 'Frameworks and Libraries', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.' 
WHERE NOT EXISTS (
    SELECT 1 FROM topics WHERE name = 'Frameworks and Libraries'
);
INSERT INTO topics (id, name, description)
SELECT 4, 'Mobile Development', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.' 
WHERE NOT EXISTS (
    SELECT 1 FROM topics WHERE name = 'Mobile Development'
);
INSERT INTO topics (id, name, description)
SELECT 5, 'DevOps', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.' 
WHERE NOT EXISTS (
    SELECT 1 FROM topics WHERE name = 'DevOps'
);
INSERT INTO topics (id, name, description)
SELECT 6, 'Data Science and AI', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.' 
WHERE NOT EXISTS (
    SELECT 1 FROM topics WHERE name = 'Data Science and AI'
);
INSERT INTO topics (id, name, description)
SELECT 7, 'Cloud Computing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.' 
WHERE NOT EXISTS (
    SELECT 1 FROM topics WHERE name = 'Cloud Computing'
);
INSERT INTO topics (id, name, description)
SELECT 8, 'UI/UX Design', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.' 
WHERE NOT EXISTS (
    SELECT 1 FROM topics WHERE name = 'UI/UX Design'
);
INSERT INTO topics (id, name, description)
SELECT 9, 'Cybersecurity', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.' 
WHERE NOT EXISTS (
    SELECT 1 FROM topics WHERE name = 'Cybersecurity'
);
INSERT INTO topics (id, name, description)
SELECT 10, 'Software Testing and QA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.' 
WHERE NOT EXISTS (
    SELECT 1 FROM topics WHERE name = 'Software Testing and QA'
);

INSERT INTO posts (id, title, content, topic_id, user_id)
SELECT 1, 'Back to Basics: HTML, CSS, and JavaScript Fundamentals', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.', 1, 1 
WHERE NOT EXISTS (
    SELECT 1 FROM posts WHERE id = 1
);

INSERT INTO posts (id, title, content, topic_id, user_id)
SELECT 2, 'Docker Deep Dive: Containers in Action', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.', 5, 2 
WHERE NOT EXISTS (
    SELECT 1 FROM posts WHERE id = 2
);

INSERT INTO posts (id, title, content, topic_id, user_id)
SELECT 3, 'Continuous Deployment: From Code to Production', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.', 5, 2 
WHERE NOT EXISTS (
    SELECT 1 FROM posts WHERE id = 3
);

INSERT INTO posts (id, title, content, topic_id, user_id)
SELECT 4, 'Ethical Hacking: Unveiling the World of White Hat Security', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Arcu bibendum at varius vel. Leo integer malesuada nunc vel risus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Nisi scelerisque eu ultrices vitae auctor eu augue ut. A diam maecenas sed enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Scelerisque in dictum non consectetur. In fermentum et sollicitudin ac orci. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Leo vel fringilla est ullamcorper.', 9, 3 
WHERE NOT EXISTS (
    SELECT 1 FROM posts WHERE id = 4
);

INSERT INTO comments (id, content, post_id, user_id)
SELECT 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1, 2 
WHERE NOT EXISTS (
    SELECT 1 FROM comments WHERE id = 1
);

INSERT INTO comments (id, content, post_id, user_id)
SELECT 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1, 3 
WHERE NOT EXISTS (
    SELECT 1 FROM comments WHERE id = 2
);

INSERT INTO comments (id, content, post_id, user_id)
SELECT 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2, 3 
WHERE NOT EXISTS (
    SELECT 1 FROM comments WHERE id = 3
);

INSERT INTO subscription (user_id, topic_id)
SELECT 1, 1 
WHERE NOT EXISTS (
    SELECT 1 FROM subscription WHERE user_id = 1 AND topic_id = 1
);