import database from "../src/models/index";

(async () => {
	const transaction = await database.sequelize.transaction();
	try {
		await database.sequelize.truncate({ cascade: true }).then(async () => {
			console.log("✅ All tables have been cleared ...");
		});

		await database.Role.bulkCreate(
			[
				{ name: "Admin", weight: 100 },
				{ name: "User", weight: 10 },
				{ name: "Moderator", weight: 50 },
				{ name: "Editor", weight: 30 },
				{ name: "Spectator", weight: 5 },
			],
			{ transaction },
		);

		await database.User.bulkCreate(
			[
				{
					login: "admin",
					password: "password_hash_1",
					firstname: "Admin",
					lastname: "User",
					nickname: "Admin123",
					email: "admin@example.com",
					"2fa": true,
				},
				{
					login: "johndoe",
					password: "password_hash_3",
					firstname: "John",
					lastname: "Doe",
					nickname: "Johnny",
					email: "john.doe@example.com",
					"2fa": false,
				},
				{
					login: "shadow",
					password: "password_hash_4",
					firstname: "Lena",
					lastname: "Smith",
					nickname: "ShadowFox",
					email: "lena.smith@example.com",
					"2fa": true,
				},
				{
					login: "necromancer",
					password: "password_hash_5",
					firstname: "Victor",
					lastname: "Grave",
					nickname: "NecroLord",
					email: "victor.grave@example.com",
					"2fa": false,
				},
				{
					login: "spectator1",
					password: "password_hash_6",
					firstname: "Mark",
					lastname: "Watcher",
					nickname: "Overseer",
					email: "mark.watcher@example.com",
					"2fa": false,
				},
			],
			{ transaction },
		);

		await database.UserHasRole.bulkCreate(
			[
				{ user_id: 1, role_id: 1 },
				{ user_id: 2, role_id: 2 },
				{ user_id: 3, role_id: 3 },
				{ user_id: 4, role_id: 4 },
				{ user_id: 5, role_id: 5 },
			],
			{ transaction },
		);

		await database.Patchnote.bulkCreate(
			[
				{
					version: "1.2.0",
					title: "Ajout du héros Bebop",
					date: new Date("2024-11-21"),
					author: "Admin123",
					content:
						"Nous sommes ravis d'annoncer l'ajout de Bebop, un nouveau héros maître des airs, apportant de nouvelles dynamiques de gameplay.",
					state: "PUBLISHED",
					img_path: "/images/patchnotes/1.2.0.png",
					video_path: "/videos/patchnotes/1.2.0.mp4",
					source:
						"https://undeadlock.com/fr-FR/patch/21-11-2024/ajout-du-heros-bebop",
				},
				{
					version: "1.3.0",
					title: "Ajout des héros Holliday, Calico et The Magnificent Sinclair",
					date: new Date("2025-01-17"),
					author: "Rom1",
					content:
						"Nous sommes ravis d'annoncer l'ajout de trois nouveaux héros : Holliday, Calico et The Magnificent Sinclair. Ces ajouts enrichissent notre roster et apportent de nouvelles dynamiques de gameplay.",
					state: "PUBLISHED",
					img_path: "/images/patchnotes/1.3.0.png",
					video_path: "/videos/patchnotes/1.3.0.mp4",
					source:
						"https://undeadlock.com/fr-FR/patch/17-01-2025/ajout-des-heros-holliday-calico-et-the-magnificent-sinclair",
				},
				{
					version: "1.3.1",
					title: "Rééquilibrage du héros The Magnificent Sinclair",
					date: new Date("2025-01-27"),
					author: "LockDead",
					content:
						"Nous avons ajusté The Magnificent Sinclair en supprimant sa réduction de 35% des dégâts des tirs à la tête et en améliorant sa compétence 'Vexing Bolt'.",
					state: "PUBLISHED",
					img_path: "/images/patchnotes/1.3.1.png",
					video_path: "/videos/patchnotes/1.3.1.mp4",
					source:
						"https://undeadlock.com/fr-FR/patch/27-01-2025/reequilibrage-du-heros-the-magnificent-sinclair",
				},
				{
					version: "1.3.2",
					title: "Mises à jour mineures pour Holliday et Calico",
					date: new Date("2025-02-02"),
					author: "Valve",
					content:
						"Des ajustements mineurs ont été apportés aux héros Holliday et Calico pour améliorer l'équilibre général du jeu.",
					state: "PUBLISHED",
					img_path: "/images/patchnotes/1.3.2.png",
					video_path: "/videos/patchnotes/1.3.2.mp4",
					source:
						"https://undeadlock.com/fr-FR/patch/02-02-2025/mises-a-jour-mineures-pour-holliday-et-calico",
				},
			],
			{ transaction },
		);

		await database.Hero.bulkCreate(
			[
				{
					name: "Bebop",
					resume: "Un maître des airs avec une agilité inégalée.",
					description:
						"Bebop est connu pour sa capacité à dominer le champ de bataille avec des attaques aériennes rapides et précises.",
					img_path: "/images/heroes/bebop.png",
					video_path: "/videos/heroes/bebop_intro.mp4",
				},
			],
			{ transaction },
		);

		// Table: Spell
		await database.Spell.bulkCreate(
			[
				{
					name: "Aerial Ace",
					hero_id: 1,
					order: 1,
					description:
						"Bebop effectue une attaque plongeante infligeant des dégâts aux ennemis dans la zone d'impact.",
					passive: false,
					charge: false,
					cooldown: 8,
					distance: "Portée : 10m",
					icon_path: "/icons/spells/aerial_ace.png",
				},
				{
					name: "Skyward Strike",
					hero_id: 1,
					order: 2,
					description:
						"Une attaque ascendante qui projette les ennemis dans les airs, les étourdissant pendant 2 secondes.",
					passive: false,
					charge: false,
					cooldown: 12,
					distance: "Portée : 5m",
					icon_path: "/icons/spells/skyward_strike.png",
				},
			],
			{ transaction },
		);

		// Table: SpellEffect
		await database.SpellEffect.bulkCreate(
			[
				{
					spell_id: 1, // Assurez-vous que l'ID correspond à 'Aerial Ace' dans la table Spell
					order: 1,
					effect:
						"Inflige 100 points de dégâts aux ennemis dans la zone ciblée.",
				},
				{
					spell_id: 2, // Assurez-vous que l'ID correspond à 'Skyward Strike' dans la table Spell
					order: 1,
					effect:
						"Inflige 80 points de dégâts et étourdit les ennemis pendant 2 secondes.",
				},
			],
			{ transaction },
		);

		// Table: Item
		await database.Item.bulkCreate(
			[
				{
					name: "Winged Boots",
					category: "VITALITY",
					cost: 1200,
					common_bonus: 15,
					active_description:
						"Augmente la vitesse de déplacement de 20% pendant 5 secondes.",
					active_duration: 5,
					passive_description:
						"Augmente la vitesse de déplacement de 5% en permanence.",
					passive_duration: 0,
					parent_id: null,
				},
				{
					name: "Feathered Amulet",
					category: "SPIRIT",
					cost: 1500,
					common_bonus: 20,
					active_description:
						"Réduit les dégâts subis de 30% pendant 4 secondes.",
					active_duration: 4,
					passive_description:
						"Augmente la résistance aux coups critiques de 10%.",
					passive_duration: 0,
					parent_id: null,
				},
			],
			{ transaction },
		);

		// Table: ItemEffect
		await database.ItemEffect.bulkCreate(
			[
				{
					item_id: 1,
					type: "ACTIVE",
					effect:
						"Augmente la vitesse de déplacement de 20% pendant 5 secondes.",
				},
				{
					item_id: 1,
					type: "PASSIVE",
					effect: "Augmente la vitesse de déplacement de 5% en permanence.",
				},
				{
					item_id: 2,
					type: "COMMON",
					effect: "Réduit les dégâts subis de 30% pendant 4 secondes.",
				},
				{
					item_id: 2,
					type: "PASSIVE",
					effect: "Augmente la résistance aux coups critiques de 10%.",
				},
			],
			{ transaction },
		);

		await database.PatchnoteEntry.bulkCreate(
			[
				// Patchnote 1.0.0 - Initial Release
				{
					patchnote_id: 1,
					category: "BUFF",
					ressource_type: "SPELL",
					ressource_id: 1,
					position: 1,
					description: "Increased fireball damage by 10%.",
				},
				{
					patchnote_id: 1,
					category: "NERF",
					ressource_type: "ITEM",
					ressource_id: 2,
					position: 2,
					description: "Reduced shield duration from 15s to 12s.",
				},
				{
					patchnote_id: 1,
					category: "CHANGE",
					ressource_type: "HERO",
					ressource_id: 1,
					position: 3,
					description: "Updated base health from 1000 to 1100.",
				},
				{
					patchnote_id: 1,
					category: "FIX",
					ressource_type: "SPELL",
					ressource_id: 1,
					position: 4,
					description: "Fixed bug where Fireball could bypass obstacles.",
				},
				{
					patchnote_id: 1,
					category: "BUFF",
					ressource_type: "SPELL",
					ressource_id: 3,
					position: 5,
					description: "Increased Dark Surge range from 20m to 25m.",
				},
				{
					patchnote_id: 1,
					category: "CHANGE",
					ressource_type: "ITEM",
					ressource_id: 3,
					position: 6,
					description: "Phantom Dagger now increases movement speed by 5%.",
				},
				{
					patchnote_id: 1,
					category: "NERF",
					ressource_type: "HERO",
					ressource_id: 2,
					position: 7,
					description: "Decreased attack power by 8%.",
				},
				{
					patchnote_id: 1,
					category: "FIX",
					ressource_type: "SPELL",
					ressource_id: 2,
					position: 8,
					description:
						"Fixed animation desynchronization issue with Dark Surge.",
				},
				{
					patchnote_id: 1,
					category: "BUFF",
					ressource_type: "HERO",
					ressource_id: 1,
					position: 9,
					description: "Increased stamina regeneration by 15%.",
				},
				{
					patchnote_id: 1,
					category: "FIX",
					ressource_type: "ITEM",
					ressource_id: 4,
					position: 10,
					description: "Fixed incorrect tooltip for Guardian Orb shield value.",
				},

				// Patchnote 1.1.0 - Update Patch
				{
					patchnote_id: 2,
					category: "FIX",
					ressource_type: "ITEM",
					ressource_id: 1,
					position: 1,
					description: "Resolved texture clipping issue with Sword of Destiny.",
				},
				{
					patchnote_id: 2,
					category: "NERF",
					ressource_type: "HERO",
					ressource_id: 2,
					position: 2,
					description: "Reduced movement speed from 7.5 to 6.8.",
				},
				{
					patchnote_id: 2,
					category: "CHANGE",
					ressource_type: "SPELL",
					ressource_id: 1,
					position: 3,
					description: "Adjusted cooldown from 10s to 9s for Fireball.",
				},
				{
					patchnote_id: 2,
					category: "BUFF",
					ressource_type: "ITEM",
					ressource_id: 3,
					position: 4,
					description:
						"Increased crit rate bonus from 5% to 7% for Phantom Dagger.",
				},
				{
					patchnote_id: 2,
					category: "CHANGE",
					ressource_type: "SPELL",
					ressource_id: 2,
					position: 5,
					description:
						"Dark Surge now scales with intelligence instead of agility.",
				},
				{
					patchnote_id: 2,
					category: "FIX",
					ressource_type: "HERO",
					ressource_id: 3,
					position: 6,
					description:
						"Resolved hitbox issue causing inconsistent collision detection.",
				},
				{
					patchnote_id: 2,
					category: "BUFF",
					ressource_type: "ITEM",
					ressource_id: 4,
					position: 7,
					description:
						"Guardian Orb now grants an additional 50 mana regeneration.",
				},
				{
					patchnote_id: 2,
					category: "NERF",
					ressource_type: "SPELL",
					ressource_id: 1,
					position: 8,
					description: "Reduced burn duration from 5s to 4s for Fireball.",
				},
				{
					patchnote_id: 2,
					category: "FIX",
					ressource_type: "ITEM",
					ressource_id: 2,
					position: 9,
					description:
						"Fixed UI display bug causing Magic Amulet to show incorrect cost.",
				},
				{
					patchnote_id: 2,
					category: "CHANGE",
					ressource_type: "HERO",
					ressource_id: 1,
					position: 10,
					description: "Adjusted animation speed for ultimate ability.",
				},

				// Patchnote 3.2.0 - New Features
				{
					patchnote_id: 3,
					category: "NERF",
					ressource_type: "GLOBAL",
					ressource_id: null,
					position: 1,
					description: "Added new hero: Shadow Reaper.",
				},
				{
					patchnote_id: 3,
					category: "NERF",
					ressource_type: "GLOBAL",
					ressource_id: null,
					position: 2,
					description: "Introduced Legendary Equipment system.",
				},
				{
					patchnote_id: 3,
					category: "BUFF",
					ressource_type: "SPELL",
					ressource_id: 3,
					position: 3,
					description: "Dark Surge damage increased by 20%.",
				},
				{
					patchnote_id: 3,
					category: "CHANGE",
					ressource_type: "ITEM",
					ressource_id: 3,
					position: 4,
					description: "Phantom Dagger now has a visual glow effect.",
				},
				{
					patchnote_id: 3,
					category: "FIX",
					ressource_type: "SPELL",
					ressource_id: 4,
					position: 5,
					description: "Fixed incorrect tooltip for Shadow Strike.",
				},
				{
					patchnote_id: 3,
					category: "BUFF",
					ressource_type: "ITEM",
					ressource_id: 4,
					position: 6,
					description: "Guardian Orb now absorbs 50 more damage.",
				},
				{
					patchnote_id: 3,
					category: "CHANGE",
					ressource_type: "HERO",
					ressource_id: 2,
					position: 7,
					description: "Adjusted skill progression tree for balance.",
				},
				{
					patchnote_id: 3,
					category: "NERF",
					ressource_type: "SPELL",
					ressource_id: 1,
					position: 8,
					description: "Fireball cooldown increased to 11s.",
				},
				{
					patchnote_id: 3,
					category: "FIX",
					ressource_type: "ITEM",
					ressource_id: 1,
					position: 9,
					description: "Corrected item rarity classification.",
				},
				{
					patchnote_id: 3,
					category: "NERF",
					ressource_type: "GLOBAL",
					ressource_id: null,
					position: 10,
					description: "New ultimate abilities added for all heroes.",
				},

				// Patchnote 4.3.0 - Balancing Update
				{
					patchnote_id: 4,
					category: "NERF",
					ressource_type: "HERO",
					ressource_id: 2,
					position: 1,
					description: "Reduced base damage by 5%.",
				},
				{
					patchnote_id: 4,
					category: "BUFF",
					ressource_type: "SPELL",
					ressource_id: 4,
					position: 2,
					description: "Increased Shadow Strike damage by 15%.",
				},
				{
					patchnote_id: 4,
					category: "FIX",
					ressource_type: "ITEM",
					ressource_id: 2,
					position: 3,
					description: "Fixed missing texture issue on Magic Amulet.",
				},
				{
					patchnote_id: 4,
					category: "CHANGE",
					ressource_type: "HERO",
					ressource_id: 3,
					position: 4,
					description: "Adjusted movement animations for smoother transitions.",
				},
				{
					patchnote_id: 4,
					category: "NERF",
					ressource_type: "SPELL",
					ressource_id: 3,
					position: 5,
					description: "Dark Surge mana cost increased by 10%.",
				},
				{
					patchnote_id: 4,
					category: "BUFF",
					ressource_type: "ITEM",
					ressource_id: 1,
					position: 6,
					description: "Sword of Destiny now grants a +5 agility bonus.",
				},
				{
					patchnote_id: 4,
					category: "CHANGE",
					ressource_type: "SPELL",
					ressource_id: 2,
					position: 7,
					description: "Fireball explosion radius reduced from 3m to 2.5m.",
				},
				{
					patchnote_id: 4,
					category: "FIX",
					ressource_type: "HERO",
					ressource_id: 1,
					position: 8,
					description: "Fixed incorrect audio cue when using ultimate ability.",
				},
				{
					patchnote_id: 4,
					category: "BUFF",
					ressource_type: "HERO",
					ressource_id: 3,
					position: 9,
					description: "Increased defense scaling by 7%.",
				},
				{
					patchnote_id: 4,
					category: "NERF",
					ressource_type: "GLOBAL",
					ressource_id: null,
					position: 10,
					description: "New crafting system added for weapon upgrades.",
				},
			],
			{ transaction },
		);

		await database.Keyword.bulkCreate(
			[
				{ ressource_type: "HERO", ressource_id: 1, value: "Tank" },
				{ ressource_type: "SPELL", ressource_id: 1, value: "Fire" },
				{ ressource_type: "ITEM", ressource_id: 1, value: "Weapon" },
				{ ressource_type: "HERO", ressource_id: 2, value: "Assassin" },
				{ ressource_type: "SPELL", ressource_id: 2, value: "Electric" },
				{ ressource_type: "ITEM", ressource_id: 2, value: "Shield" },
			],
			{ transaction },
		);

		await database.Log.bulkCreate(
			[
				{
					action: "LOGIN",
					context: "User logged in.",
					user_id: 1,
					ip: "192.168.1.1",
				},
				{
					action: "CREATE",
					context: "Patchnote created.",
					user_id: 2,
					ip: "192.168.1.2",
				},
				{
					action: "DELETE",
					context: "User deleted a comment.",
					user_id: 3,
					ip: "192.168.1.3",
				},
				{
					action: "EDIT",
					context: "User updated profile information.",
					user_id: 4,
					ip: "192.168.1.4",
				},
			],
			{ transaction },
		);

		await database.Statistic.bulkCreate(
			[
				{ origin: "Homepage", count: 120, date: Date.now(), type: "VIEW" },
				{
					origin: "Patchnotes",
					count: 45,
					date: Date.now() - 86400000 * 2,
					type: "CLICK",
				},
				{
					origin: "Hero Selection",
					count: 98,
					date: Date.now() - 86400000,
					type: "VIEW",
				},
				{
					origin: "Leaderboard",
					count: 67,
					date: Date.now() - 86400000 * 3,
					type: "CLICK",
				},
				{
					origin: "Item Database",
					count: 155,
					date: Date.now() - 86400000 * 4,
					type: "VIEW",
				},
			],
			{ transaction },
		);

		await database.Setting.bulkCreate(
			[
				{ key: "homepage_url", value: "https://example.com", type: "URL" },
				{ key: "max_upload_size", value: "10485760", type: "TEXT" },
				{
					key: "default_avatar_path",
					value: "/images/default_avatar.png",
					type: "PATH",
				},
				{
					key: "support_url",
					value: "https://support.example.com",
					type: "URL",
				},
				{ key: "session_timeout", value: "3600", type: "TEXT" },
				{ key: "log_file_path", value: "/logs/server.log", type: "PATH" },
			],
			{ transaction },
		);

		await transaction.commit();
		console.log("✅ Seeding completed successfully");
	} catch (error) {
		console.error("❌ Error while seeding :", error);
		await transaction.rollback();
	}
})();
