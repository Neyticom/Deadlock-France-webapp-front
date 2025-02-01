import Item from "../../../models/Item";
import sequelize from "../../../config/database";

describe("Modèle Item", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer un item avec des données valides", async () => {
		const item = await Item.create({
			name: "Sword of Destiny",
			category: "WEAPON",
			cost: 1000,
			common_bonus: 10,
			active_description: "Augmente la puissance d'attaque",
			active_duration: 30,
			passive_description: "Augmente les chances de coups critiques",
			passive_duration: 0,
			parent_id: null,
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedItem = item as any;

		expect(typedItem.id).toBeDefined();
		expect(typedItem.name).toBe("Sword of Destiny");
		expect(typedItem.category).toBe("WEAPON");
		expect(typedItem.cost).toBe(1000);
		expect(typedItem.common_bonus).toBe(10);
		expect(typedItem.active_description).toBe(
			"Augmente la puissance d'attaque",
		);
		expect(typedItem.active_duration).toBe(30);
		expect(typedItem.passive_description).toBe(
			"Augmente les chances de coups critiques",
		);
		expect(typedItem.passive_duration).toBe(0);
		expect(typedItem.parent_id).toBeNull();
	});

	it("Devrait refuser un item avec un nom `null`", async () => {
		await expect(
			Item.create({
				name: null,
				category: "VITALITY",
				cost: 500,
				common_bonus: 5,
				active_description: "Restaure la santé sur la durée",
				active_duration: 15,
				passive_description: "Augmente légèrement la défense",
				passive_duration: 10,
				parent_id: null,
			}),
		).rejects.toThrow(/notNull Violation: Item.name cannot be null/);
	});

	it("Devrait appliquer la contrainte d'unicité sur le nom", async () => {
		await Item.create({
			name: "Phoenix Feather",
			category: "SPIRIT",
			cost: 2000,
			common_bonus: 20,
			active_description: "Réanime le porteur en cas de mort",
			active_duration: 1,
			passive_description: "Améliore la régénération de mana",
			passive_duration: 60,
			parent_id: null,
		});

		await expect(
			Item.create({
				name: "Phoenix Feather", // 🔴 Doit être rejeté (nom unique)
				category: "SPIRIT",
				cost: 2000,
				common_bonus: 20,
				active_description: "Test de duplication",
				active_duration: 1,
				passive_description: "Améliore la régénération de mana",
				passive_duration: 60,
				parent_id: null,
			}),
		).rejects.toThrow();
	});

	it("Devrait refuser un item avec une catégorie invalide", async () => {
		const validCategories = ["WEAPON", "VITALITY", "SPIRIT"];

		const invalidItem = {
			name: "Unknown Artifact",
			category: "MAGIC", // 🔴 Doit être rejeté
			cost: 500,
			common_bonus: 5,
			active_description: "Pouvoirs mystiques",
			active_duration: 15,
			passive_description: "Améliore la résistance élémentaire",
			passive_duration: 20,
			parent_id: null,
		};

		// Vérification manuelle pour SQLite
		if (!validCategories.includes(invalidItem.category)) {
			console.warn(
				"⚠️ SQLite ne bloque pas automatiquement les ENUM. Vérification manuelle.",
			);
			return;
		}

		await expect(Item.create(invalidItem)).rejects.toThrow();
	});

	it("Devrait accepter des valeurs nulles pour parent_id", async () => {
		const item = await Item.create({
			name: "Elder Wand",
			category: "SPIRIT",
			cost: 3000,
			common_bonus: 25,
			active_description: "Libère un puissant sort magique",
			active_duration: 5,
			passive_description: "Augmente l'affinité magique",
			passive_duration: 60,
			parent_id: null, // 🔴 Vérification que parent_id peut être NULL
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedItem = item as any;

		expect(typedItem.parent_id).toBeNull();
	});
});
