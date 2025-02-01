import SpellEffect from "../../../models/SpellEffect";
import Spell from "../../../models/Spell";
import Hero from "../../../models/Hero";
import sequelize from "../../../config/database";

describe("Modèle SpellEffect", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests

		// Création d'un héros et d'un sort pour tester l'association
		const hero = await Hero.create({
			name: "Mage",
			resume: "Maître de la magie élémentaire.",
			description:
				"Utilise de puissants sorts pour contrôler le champ de bataille.",
			img_path: "/images/mage.jpg",
			video_path: "/videos/mage.mp4",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedHero = hero as any;

		await Spell.create({
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
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer un effet de sort avec des données valides", async () => {
		const spell = await Spell.findOne({ where: { name: "Boule de feu" } });

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedSpell = spell as any;

		const spellEffect = await SpellEffect.create({
			spell_id: typedSpell.id,
			order: 1,
			effect: "Inflige 50 dégâts à tous les ennemis dans la zone.",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedSpellEffect = spellEffect as any;

		expect(typedSpellEffect.id).toBeDefined();
		expect(typedSpellEffect.spell_id).toBe(typedSpell.id);
		expect(typedSpellEffect.order).toBe(1);
		expect(typedSpellEffect.effect).toBe(
			"Inflige 50 dégâts à tous les ennemis dans la zone.",
		);
	});

	it("Devrait refuser un effet de sort sans spell_id", async () => {
		await expect(
			SpellEffect.create({
				spell_id: null, // 🔴 Doit échouer car `allowNull: false`
				order: 1,
				effect: "Effet sans sort associé.",
			}),
		).rejects.toThrow(/notNull Violation: SpellEffect.spell_id cannot be null/);
	});

	it("Devrait refuser un effet de sort sans description d'effet", async () => {
		await expect(
			SpellEffect.create({
				spell_id: 1,
				order: 2,
				effect: null, // 🔴 Doit échouer car `allowNull: false`
			}),
		).rejects.toThrow(/notNull Violation: SpellEffect.effect cannot be null/);
	});

	it("Devrait refuser un effet de sort avec le champ `order` null", async () => {
		await expect(
			SpellEffect.create({
				spell_id: 1,
				order: null, // 🔴 Doit échouer car `allowNull: false`
				effect: "Test d'ordre invalide.",
			}),
		).rejects.toThrow(/notNull Violation: SpellEffect.order cannot be null/);
	});

	it("Devrait refuser un effet de sort avec un spell_id inexistant", async () => {
		await expect(
			SpellEffect.create({
				spell_id: 999, // 🔴 ID inexistant
				order: 3,
				effect: "Un effet mystérieux sans sort.",
			}),
		).rejects.toThrow();
	});
});
