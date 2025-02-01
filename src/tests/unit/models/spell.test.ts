import Spell from "../../../models/Spell";
import Hero from "../../../models/Hero";
import sequelize from "../../../config/database";

describe("Modèle Spell", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests

		// Création d'un héros pour tester l'association
		await Hero.create({
			name: "Mage",
			resume: "Maître de la magie élémentaire.",
			description:
				"Utilise de puissants sorts pour contrôler le champ de bataille.",
			img_path: "/images/mage.jpg",
			video_path: "/videos/mage.mp4",
		});
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer un sort avec des données valides", async () => {
		const hero = await Hero.findOne({ where: { name: "Mage" } });

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedHero = hero as any;

		const spell = await Spell.create({
			hero_id: typedHero.id,
			name: "Boule de feu",
			order: 1,
			description: "Lance une boule de feu qui explose à l'impact.",
			passive: false,
			charge: true,
			charge_count: 3,
			charge_time: 5,
			charge_interval: 2,
			cooldown: 10,
			distance: "Portée: 15m",
			first_upgrade: "Augmente le rayon d'explosion.",
			second_upgrade: "Réduit le temps de recharge de 2 secondes.",
			third_upgrade: "Ajoute des dégâts de brûlure sur la durée.",
			icon_path: "/icons/fireball.png",
			demo_path: "/videos/fireball.mp4",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedSpell = spell as any;

		expect(typedSpell.id).toBeDefined();
		expect(typedSpell.hero_id).toBe(typedHero.id);
		expect(typedSpell.name).toBe("Boule de feu");
		expect(typedSpell.order).toBe(1);
		expect(typedSpell.description).toBe(
			"Lance une boule de feu qui explose à l'impact.",
		);
		expect(typedSpell.passive).toBe(false);
		expect(typedSpell.charge).toBe(true);
		expect(typedSpell.charge_count).toBe(3);
		expect(typedSpell.charge_time).toBe(5);
		expect(typedSpell.charge_interval).toBe(2);
		expect(typedSpell.cooldown).toBe(10);
		expect(typedSpell.distance).toBe("Portée: 15m");
		expect(typedSpell.first_upgrade).toBe("Augmente le rayon d'explosion.");
		expect(typedSpell.second_upgrade).toBe(
			"Réduit le temps de recharge de 2 secondes.",
		);
		expect(typedSpell.third_upgrade).toBe(
			"Ajoute des dégâts de brûlure sur la durée.",
		);
		expect(typedSpell.icon_path).toBe("/icons/fireball.png");
		expect(typedSpell.demo_path).toBe("/videos/fireball.mp4");
	});

	it("Devrait refuser un sort sans nom", async () => {
		await expect(
			Spell.create({
				hero_id: 1,
				name: null,
				order: 1,
				description: "Test de sort avec un nom null",
				passive: false,
				charge: false,
				charge_count: 0,
				charge_time: 0,
				charge_interval: 0,
				cooldown: 10,
				distance: "Portée: 10m",
			}),
		).rejects.toThrow(/notNull Violation: Spell.name cannot be null/);
	});

	it("Devrait appliquer la contrainte d'unicité sur le nom", async () => {
		await Spell.create({
			hero_id: 1,
			name: "Lance de glace",
			order: 2,
			description: "Projette une lance de glace qui ralentit les ennemis.",
			passive: false,
			charge: false,
			charge_count: 0,
			charge_time: 0,
			charge_interval: 0,
			cooldown: 8,
			distance: "Portée: 20m",
		});

		await expect(
			Spell.create({
				hero_id: 1,
				name: "Lance de glace", // 🔴 Doit échouer (nom unique)
				order: 3,
				description: "Test de duplication de sort",
				passive: false,
				charge: false,
				charge_count: 0,
				charge_time: 0,
				charge_interval: 0,
				cooldown: 8,
				distance: "Portée: 20m",
			}),
		).rejects.toThrow();
	});

	it("Devrait refuser un sort sans hero_id", async () => {
		await expect(
			Spell.create({
				hero_id: null, // 🔴 Doit échouer car `allowNull: false`
				name: "Frappe foudroyante",
				order: 3,
				description: "Foudroie les ennemis avec un éclair.",
				passive: false,
				charge: false,
				charge_count: 0,
				charge_time: 0,
				charge_interval: 0,
				cooldown: 12,
				distance: "Portée: 18m",
			}),
		).rejects.toThrow(/notNull Violation: Spell.hero_id cannot be null/);
	});

	it("Devrait refuser un sort avec un hero_id inexistant", async () => {
		await expect(
			Spell.create({
				hero_id: 999, // 🔴 ID inexistant
				name: "Explosion d'ombre",
				order: 4,
				description: "Une explosion d'énergie noire.",
				passive: false,
				charge: false,
				charge_count: 0,
				charge_time: 0,
				charge_interval: 0,
				cooldown: 7,
				distance: "Portée: 12m",
			}),
		).rejects.toThrow();
	});
});
