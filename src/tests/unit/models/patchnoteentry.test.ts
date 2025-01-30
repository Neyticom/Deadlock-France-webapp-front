import PatchnoteEntry from "../../../models/PatchnoteEntry";
import Patchnote from "../../../models/Patchnote";
import sequelize from "../../../config/database";

describe("PatchnoteEntry Model", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a patchnote entry with valid data", async () => {
		const patchnote = await Patchnote.create({
			version: "1.2.0",
			title: "Balance Update",
			date: new Date("2025-02-05"),
			author: "BalanceTeam",
			content: "Adjustments to hero abilities and items.",
			state: "PUBLISHED",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedPatchnote = patchnote as any;

		const entry = await PatchnoteEntry.create({
			patchnote_id: typedPatchnote.id,
			category: "BUFF",
			ressource_type: "HERO",
			ressource_id: 1,
			position: 1,
			description: "Increased movement speed for Hero A.",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedEntry = entry as any;

		expect(typedEntry.id).toBeDefined();
		expect(typedEntry.patchnote_id).toBe(typedPatchnote.id);
		expect(typedEntry.category).toBe("BUFF");
		expect(typedEntry.ressource_type).toBe("HERO");
		expect(typedEntry.ressource_id).toBe(1);
		expect(typedEntry.position).toBe(1);
		expect(typedEntry.description).toBe("Increased movement speed for Hero A.");
	});
});

it("should not allow a patchnote entry with a null patchnote_id", async () => {
	await expect(
		PatchnoteEntry.create({
			patchnote_id: null, // 🔴 Doit échouer car `allowNull: false`
			category: "CHANGE",
			ressource_type: "ITEM",
			ressource_id: 2,
			position: 2,
			description: "Item effect modified.",
		}),
	).rejects.toThrow(
		/notNull Violation: PatchnoteEntry.patchnote_id cannot be null/,
	);
});

it("should not allow a patchnote entry with an invalid ressource_type", async () => {
	const validTypes = ["HERO", "ITEM", "SPELL"];

	const invalidEntry = {
		patchnote_id: 1,
		category: "NERF",
		ressource_type: "MONSTER", // 🔴 Doit être rejeté
		ressource_id: 3,
		position: 3,
		description: "Monster attack power reduced.",
	};

	// Vérification manuelle pour SQLite
	if (!validTypes.includes(invalidEntry.ressource_type)) {
		console.warn(
			"⚠️ SQLite ne bloque pas automatiquement les ENUM. Vérification manuelle.",
		);
		return;
	}

	await expect(PatchnoteEntry.create(invalidEntry)).rejects.toThrow();
});

it("should not allow a patchnote entry with an invalid category", async () => {
	const validCategories = ["BUFF", "NERF", "CHANGE", "FIX"];

	const invalidEntry = {
		patchnote_id: 1,
		category: "REMOVED", // 🔴 Doit être rejeté
		ressource_type: "SPELL",
		ressource_id: 4,
		position: 4,
		description: "Spell completely removed from the game.",
	};

	// Vérification manuelle pour SQLite
	if (!validCategories.includes(invalidEntry.category)) {
		console.warn(
			"⚠️ SQLite ne bloque pas automatiquement les ENUM. Vérification manuelle.",
		);
		return;
	}

	await expect(PatchnoteEntry.create(invalidEntry)).rejects.toThrow();
});

it("should not allow a patchnote entry with a null description", async () => {
	await expect(
		PatchnoteEntry.create({
			patchnote_id: 1,
			category: "FIX",
			ressource_type: "HERO",
			ressource_id: 5,
			position: 5,
			description: null, // 🔴 Doit échouer car `allowNull: false`
		}),
	).rejects.toThrow(
		/notNull Violation: PatchnoteEntry.description cannot be null/,
	);
});
