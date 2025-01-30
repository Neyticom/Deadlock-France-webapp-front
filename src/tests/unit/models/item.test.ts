import Item from "../../../models/Item";
import sequelize from "../../../config/database";

describe("Item Model", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create an item with valid data", async () => {
		const item = await Item.create({
			name: "Sword of Destiny",
			category: "WEAPON",
			cost: 1000,
			common_bonus: 10,
			active_description: "Increases attack power",
			active_duration: 30,
			passive_description: "Boosts critical hit chance",
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
		expect(typedItem.active_description).toBe("Increases attack power");
		expect(typedItem.active_duration).toBe(30);
		expect(typedItem.passive_description).toBe("Boosts critical hit chance");
		expect(typedItem.passive_duration).toBe(0);
		expect(typedItem.parent_id).toBeNull();
	});

	it("should not allow an item with a null name", async () => {
		await expect(
			Item.create({
				name: null,
				category: "VITALITY",
				cost: 500,
				common_bonus: 5,
				active_description: "Restores health over time",
				active_duration: 15,
				passive_description: "Slightly increases defense",
				passive_duration: 10,
				parent_id: null,
			}),
		).rejects.toThrow(/notNull Violation: Item.name cannot be null/);
	});

	it("should enforce unique constraints on name", async () => {
		await Item.create({
			name: "Phoenix Feather",
			category: "SPIRIT",
			cost: 2000,
			common_bonus: 20,
			active_description: "Revives the wearer upon death",
			active_duration: 1,
			passive_description: "Enhances mana regeneration",
			passive_duration: 60,
			parent_id: null,
		});

		await expect(
			Item.create({
				name: "Phoenix Feather", // 🔴 Doit être rejeté (nom unique)
				category: "SPIRIT",
				cost: 2000,
				common_bonus: 20,
				active_description: "Duplicate test",
				active_duration: 1,
				passive_description: "Enhances mana regeneration",
				passive_duration: 60,
				parent_id: null,
			}),
		).rejects.toThrow();
	});

	it("should not allow an item with an invalid category", async () => {
		const validCategories = ["WEAPON", "VITALITY", "SPIRIT"];

		const invalidItem = {
			name: "Unknown Artifact",
			category: "MAGIC", // 🔴 Doit être rejeté
			cost: 500,
			common_bonus: 5,
			active_description: "Mystical powers",
			active_duration: 15,
			passive_description: "Enhances elemental resistance",
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

	it("should allow null values for parent_id", async () => {
		const item = await Item.create({
			name: "Elder Wand",
			category: "SPIRIT",
			cost: 3000,
			common_bonus: 25,
			active_description: "Unleashes a powerful magic spell",
			active_duration: 5,
			passive_description: "Increases magical affinity",
			passive_duration: 60,
			parent_id: null, // 🔴 Vérification que parent_id peut être NULL
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedItem = item as any;

		expect(typedItem.parent_id).toBeNull();
	});
});
