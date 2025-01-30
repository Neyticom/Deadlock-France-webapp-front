import Spell from "../../../models/Spell";
import Hero from "../../../models/Hero";
import sequelize from "../../../config/database";

describe("Spell Model", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests

		// Création d'un héros pour tester l'association
		await Hero.create({
			name: "Mage",
			resume: "A master of elemental magic.",
			description: "Uses powerful spells to control the battlefield.",
			img_path: "/images/mage.jpg",
			video_path: "/videos/mage.mp4",
		});
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a spell with valid data", async () => {
		const hero = await Hero.findOne({ where: { name: "Mage" } });

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedHero = hero as any;

		const spell = await Spell.create({
			hero_id: typedHero.id,
			name: "Fireball",
			order: 1,
			description: "Launches a fireball that explodes on impact.",
			passive: false,
			charge: true,
			charge_count: 3,
			charge_time: 5,
			charge_interval: 2,
			cooldown: 10,
			distance: "Range: 15m",
			first_upgrade: "Increases explosion radius.",
			second_upgrade: "Reduces cooldown by 2 seconds.",
			third_upgrade: "Adds burn damage over time.",
			icon_path: "/icons/fireball.png",
			demo_path: "/videos/fireball.mp4",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedSpell = spell as any;

		expect(typedSpell.id).toBeDefined();
		expect(typedSpell.hero_id).toBe(typedHero.id);
		expect(typedSpell.name).toBe("Fireball");
		expect(typedSpell.order).toBe(1);
		expect(typedSpell.description).toBe(
			"Launches a fireball that explodes on impact.",
		);
		expect(typedSpell.passive).toBe(false);
		expect(typedSpell.charge).toBe(true);
		expect(typedSpell.charge_count).toBe(3);
		expect(typedSpell.charge_time).toBe(5);
		expect(typedSpell.charge_interval).toBe(2);
		expect(typedSpell.cooldown).toBe(10);
		expect(typedSpell.distance).toBe("Range: 15m");
		expect(typedSpell.first_upgrade).toBe("Increases explosion radius.");
		expect(typedSpell.second_upgrade).toBe("Reduces cooldown by 2 seconds.");
		expect(typedSpell.third_upgrade).toBe("Adds burn damage over time.");
		expect(typedSpell.icon_path).toBe("/icons/fireball.png");
		expect(typedSpell.demo_path).toBe("/videos/fireball.mp4");
	});

	it("should not allow a spell with a null name", async () => {
		await expect(
			Spell.create({
				hero_id: 1,
				name: null,
				order: 1,
				description: "Null name test",
				passive: false,
				charge: false,
				charge_count: 0,
				charge_time: 0,
				charge_interval: 0,
				cooldown: 10,
				distance: "Range: 10m",
			}),
		).rejects.toThrow(/notNull Violation: Spell.name cannot be null/);
	});

	it("should enforce unique constraints on name", async () => {
		await Spell.create({
			hero_id: 1,
			name: "Ice Spear",
			order: 2,
			description: "Throws a spear of ice that slows enemies.",
			passive: false,
			charge: false,
			charge_count: 0,
			charge_time: 0,
			charge_interval: 0,
			cooldown: 8,
			distance: "Range: 20m",
		});

		await expect(
			Spell.create({
				hero_id: 1,
				name: "Ice Spear", // 🔴 Doit échouer (nom unique)
				order: 3,
				description: "Duplicate spell name test",
				passive: false,
				charge: false,
				charge_count: 0,
				charge_time: 0,
				charge_interval: 0,
				cooldown: 8,
				distance: "Range: 20m",
			}),
		).rejects.toThrow();
	});

	it("should not allow a spell with a null hero_id", async () => {
		await expect(
			Spell.create({
				hero_id: null, // 🔴 Doit échouer car `allowNull: false`
				name: "Thunderstrike",
				order: 3,
				description: "Strikes enemies with lightning.",
				passive: false,
				charge: false,
				charge_count: 0,
				charge_time: 0,
				charge_interval: 0,
				cooldown: 12,
				distance: "Range: 18m",
			}),
		).rejects.toThrow(/notNull Violation: Spell.hero_id cannot be null/);
	});

	it("should not allow a spell with a non-existent hero_id", async () => {
		await expect(
			Spell.create({
				hero_id: 999, // 🔴 ID inexistant
				name: "Shadow Burst",
				order: 4,
				description: "A burst of dark energy.",
				passive: false,
				charge: false,
				charge_count: 0,
				charge_time: 0,
				charge_interval: 0,
				cooldown: 7,
				distance: "Range: 12m",
			}),
		).rejects.toThrow();
	});
});
