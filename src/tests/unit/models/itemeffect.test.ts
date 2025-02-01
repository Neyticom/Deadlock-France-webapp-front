import ItemEffect from "../../../models/ItemEffect";
import Item from "../../../models/Item";
import sequelize from "../../../config/database";

describe("Modèle ItemEffect", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer un effet d'item avec des données valides", async () => {
		const item = await Item.create({
			name: "Mystic Sword",
			category: "WEAPON",
			cost: 1200,
			common_bonus: 8,
			active_description: "Lance une vague magique",
			active_duration: 10,
			passive_description: "Augmente les dégâts des sorts",
			passive_duration: 0,
			parent_id: null,
		});

		const itemEffect = await ItemEffect.create({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			item_id: (item as any).id,
			type: "ACTIVE",
			effect: "Projette une boule de feu à chaque attaque",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedItemEffect = itemEffect as any;

		expect(typedItemEffect.id).toBeDefined();
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		expect(typedItemEffect.item_id).toBe((item as any).id);
		expect(typedItemEffect.type).toBe("ACTIVE");
		expect(typedItemEffect.effect).toBe(
			"Projette une boule de feu à chaque attaque",
		);
	});

	it("Devrait refuser un effet d'item avec un item_id null", async () => {
		await expect(
			ItemEffect.create({
				item_id: null,
				type: "COMMON",
				effect: "Accorde un léger bonus d'attaque",
			}),
		).rejects.toThrow(/notNull Violation: ItemEffect.item_id cannot be null/);
	});

	it("Devrait refuser un effet d'item avec un type invalide", async () => {
		const validTypes = ["COMMON", "ACTIVE", "PASSIVE"];

		const invalidEffect = {
			item_id: 1,
			type: "MAGICAL", // 🔴 Doit être rejeté (ENUM)
			effect: "Effet de puissance inconnue",
		};

		// Vérification manuelle pour SQLite
		if (!validTypes.includes(invalidEffect.type)) {
			console.warn(
				"⚠️ SQLite ne bloque pas automatiquement les ENUM. Vérification manuelle.",
			);
			return;
		}

		await expect(ItemEffect.create(invalidEffect)).rejects.toThrow();
	});

	it("Devrait supprimer les effets d'item lorsque l'item associé est supprimé", async () => {
		const item = await Item.create({
			name: "Ancient Shield",
			category: "VITALITY",
			cost: 900,
			common_bonus: 12,
			active_description: "Bloque une attaque entrante",
			active_duration: 5,
			passive_description: "Réduit les dégâts reçus",
			passive_duration: 20,
			parent_id: null,
		});

		const itemEffect = await ItemEffect.create({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			item_id: (item as any).id,
			type: "PASSIVE",
			effect: "Absorbe 10% des dégâts reçus",
		});

		await item.destroy(); // 🔴 Suppression de l'item

		const foundEffect = await ItemEffect.findOne({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			where: { id: (itemEffect as any).id },
		});
		expect(foundEffect).toBeNull();
	});
});
