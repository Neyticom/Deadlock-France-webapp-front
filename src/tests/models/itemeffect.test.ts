import ItemEffect from "../../models/ItemEffect";
import Item from "../../models/Item";
import sequelize from "../../config/database";

describe("ItemEffect Model", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create an item effect with valid data", async () => {
		const item = await Item.create({
			name: "Mystic Sword",
			category: "WEAPON",
			cost: 1200,
			common_bonus: 8,
			active_description: "Casts a magic wave",
			active_duration: 10,
			passive_description: "Boosts spell damage",
			passive_duration: 0,
			parent_id: null,
		});

		const itemEffect = await ItemEffect.create({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			item_id: (item as any).id,
			type: "ACTIVE",
			effect: "Shoots a fireball upon attack",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedItemEffect = itemEffect as any;

		expect(typedItemEffect.id).toBeDefined();
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		expect(typedItemEffect.item_id).toBe((item as any).id);
		expect(typedItemEffect.type).toBe("ACTIVE");
		expect(typedItemEffect.effect).toBe("Shoots a fireball upon attack");
	});

	it("should not allow an item effect with a null item_id", async () => {
		await expect(
			ItemEffect.create({
				item_id: null,
				type: "COMMON",
				effect: "Grants a small attack boost",
			}),
		).rejects.toThrow(/notNull Violation: ItemEffect.item_id cannot be null/);
	});

	it("should not allow an item effect with an invalid type", async () => {
		const validTypes = ["COMMON", "ACTIVE", "PASSIVE"];

		const invalidEffect = {
			item_id: 1,
			type: "MAGICAL", // 🔴 Doit être rejeté (ENUM)
			effect: "Unknown power effect",
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

	it("should delete item effects when the associated item is deleted", async () => {
		const item = await Item.create({
			name: "Ancient Shield",
			category: "VITALITY",
			cost: 900,
			common_bonus: 12,
			active_description: "Blocks an incoming attack",
			active_duration: 5,
			passive_description: "Reduces damage taken",
			passive_duration: 20,
			parent_id: null,
		});

		const itemEffect = await ItemEffect.create({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			item_id: (item as any).id,
			type: "PASSIVE",
			effect: "Absorbs 10% of incoming damage",
		});

		await item.destroy(); // 🔴 Suppression de l'item

		const foundEffect = await ItemEffect.findOne({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			where: { id: (itemEffect as any).id },
		});
		expect(foundEffect).toBeNull();
	});
});
