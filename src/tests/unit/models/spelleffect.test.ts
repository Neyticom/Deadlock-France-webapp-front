import SpellEffect from "../../../models/SpellEffect";
import Spell from "../../../models/Spell";
import Hero from "../../../models/Hero";
import sequelize from "../../../config/database";

describe("SpellEffect Model", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests

		// Création d'un héros et d'un sort pour tester l'association
		const hero = await Hero.create({
			name: "Mage",
			resume: "A master of elemental magic.",
			description: "Uses powerful spells to control the battlefield.",
			img_path: "/images/mage.jpg",
			video_path: "/videos/mage.mp4",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedHero = hero as any;

		await Spell.create({
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
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a spell effect with valid data", async () => {
		const spell = await Spell.findOne({ where: { name: "Fireball" } });

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedSpell = spell as any;

		const spellEffect = await SpellEffect.create({
			spell_id: typedSpell.id,
			order: 1,
			effect: "Deals 50 damage to all enemies in the area.",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedSpellEffect = spellEffect as any;

		expect(typedSpellEffect.id).toBeDefined();
		expect(typedSpellEffect.spell_id).toBe(typedSpell.id);
		expect(typedSpellEffect.order).toBe(1);
		expect(typedSpellEffect.effect).toBe(
			"Deals 50 damage to all enemies in the area.",
		);
	});

	it("should not allow a spell effect with a null spell_id", async () => {
		await expect(
			SpellEffect.create({
				spell_id: null, // 🔴 Doit échouer car `allowNull: false`
				order: 1,
				effect: "Effect without a spell.",
			}),
		).rejects.toThrow(/notNull Violation: SpellEffect.spell_id cannot be null/);
	});

	it("should not allow a spell effect with a null effect", async () => {
		await expect(
			SpellEffect.create({
				spell_id: 1,
				order: 2,
				effect: null, // 🔴 Doit échouer car `allowNull: false`
			}),
		).rejects.toThrow(/notNull Violation: SpellEffect.effect cannot be null/);
	});

	it("should not allow a spell effect with a null order", async () => {
		await expect(
			SpellEffect.create({
				spell_id: 1,
				order: null, // 🔴 Doit échouer car `allowNull: false`
				effect: "Invalid order test.",
			}),
		).rejects.toThrow(/notNull Violation: SpellEffect.order cannot be null/);
	});

	it("should not allow a spell effect with a non-existent spell_id", async () => {
		await expect(
			SpellEffect.create({
				spell_id: 999, // 🔴 ID inexistant
				order: 3,
				effect: "A mysterious effect with no spell.",
			}),
		).rejects.toThrow();
	});
});
