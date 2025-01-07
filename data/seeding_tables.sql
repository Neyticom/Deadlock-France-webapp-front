BEGIN;

INSERT INTO "role" ("name", "weight") VALUES
('Admin', 100),
('User', 10);

INSERT INTO "user" ("login", "password", "role_id", "firstname", "lastname", "nickname", "email", "2fa") VALUES
('admin', 'password_hash_1', 1, 'Admin', 'User', 'Admin123', 'admin@example.com', TRUE),
('johndoe', 'password_hash_3', 2, 'John', 'Doe', 'Johnny', 'john.doe@example.com', FALSE);

INSERT INTO "patchnote" ("version", "title", "date", "author", "content", "state") VALUES
('1.0.0', 'Initial Release', NOW(), 'Admin123', 'First release notes content.', 'PUBLISHED'),
('1.1.0', 'Update Patch', NOW() - INTERVAL '1 DAY', 'Johnny', 'Bug fixes and performance improvements.', 'DRAFT');

INSERT INTO "patchnote_publishers" ("user_id", "patchnote_id") VALUES
(1, 1),
(1, 2);

INSERT INTO "hero" ("name", "resume", "description", "img_path", "video_path") VALUES
('Hero 1', 'Hero 1 resume', 'Description of Hero 1.', '/images/hero1.png', '/videos/hero1.mp4'),
('Hero 2', 'Hero 2 resume', 'Description of Hero 2.', '/images/hero2.png', '/videos/hero2.mp4');

INSERT INTO "spell" ("name", "hero_id", "order", "description", "passive", "charge", "cooldown", "distance", "icon_path") VALUES
('Fireball', 1, 1, 'Fireball description.', FALSE, TRUE, 10, 'Range: 15m', '/icons/fireball.png');

INSERT INTO "spell_effect" ("spell_id", "order", "effect") VALUES
(1, 1, 'Deals 50 damage to all enemies.'),
(1, 2, 'Burns enemies for 5 seconds.');

INSERT INTO "item" ("name", "category", "cost", "common_bonus", "active_description", "active_duration", "passive_description", "passive_duration", "parent_id") VALUES
('Sword of Destiny', 'WEAPON', 1500, 10, 'Increases attack speed.', 30, 'Permanent damage bonus.', 0, NULL),
('Magic Amulet', 'VITALITY', 1200, 20, 'Grants a shield.', 15, 'Increases health regeneration.', 0, NULL);

INSERT INTO "item_effect" ("item_id", "type", "effect") VALUES
(1, 'COMMON', 'Bonus +10 attack.'),
(2, 'ACTIVE', 'Grants 200 shield points.');

INSERT INTO "patchnote_entry" ("patchnote_id", "category", "ressource_type", "ressource_id", "position", "description") VALUES
(1, 'BUFF', 'SPELL', 1, 1, 'Increased fireball damage by 10%.'),
(2, 'FIX', 'ITEM', 1, 1, 'Resolved texture clipping issue with Sword of Destiny.');

INSERT INTO "keyword" ("ressource_type", "ressource_id", "value") VALUES
('HERO', 1, 'Tank'),
('SPELL', 1, 'Fire'),
('ITEM', 1, 'Weapon');

INSERT INTO "log" ("action", "context", "user_id", "ip") VALUES
('LOGIN', 'User logged in.', 1, '192.168.1.1'),
('CREATE', 'Patchnote created.', 2, '192.168.1.2');

INSERT INTO "statistic" ("origin", "count", "date", "type") VALUES
('Homepage', 120, NOW(), 'VIEW'),
('Patchnotes', 45, NOW() - INTERVAL '2 DAYS', 'CLICK');

INSERT INTO "setting" ("key", "value", "type") VALUES
('homepage_url', 'https://example.com', 'URL'),
('max_upload_size', '10485760', 'TEXT'),
('default_avatar_path', '/images/default_avatar.png', 'PATH');

COMMIT;
