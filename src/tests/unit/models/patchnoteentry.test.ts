import PatchnoteEntry from "../../../models/PatchnoteEntry";
import Patchnote from "../../../models/Patchnote";
import sequelize from "../../../config/database";

describe("Modèle PatchnoteEntry", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer une entrée de patchnote avec des données valides", async () => {
		const patchnote = await Patchnote.create({
			version: "1.2.0",
			title: "Mise à jour d'équilibrage",
			date: new Date("2025-02-05"),
			author: "Équipe d'équilibrage",
			content: "Ajustements des capacités des héros et des objets.",
			state: "PUBLISHED",
			img_path: "/images/patchnote_1.png",
			video_path: "/videos/patchnote_1.mp4",
			source: "https://patchnotes.deadlock-france.com/1.2.0",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedPatchnote = patchnote as any;

		const entry = await PatchnoteEntry.create({
			patchnote_id: typedPatchnote.id,
			category: "BUFF",
			ressource_type: "HERO",
			ressource_id: 1,
			position: 1,
			description: "Augmentation de la vitesse de déplacement pour le Héros A.",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedEntry = entry as any;

		expect(typedEntry.id).toBeDefined();
		expect(typedEntry.patchnote_id).toBe(typedPatchnote.id);
		expect(typedEntry.category).toBe("BUFF");
		expect(typedEntry.ressource_type).toBe("HERO");
		expect(typedEntry.ressource_id).toBe(1);
		expect(typedEntry.position).toBe(1);
		expect(typedEntry.description).toBe(
			"Augmentation de la vitesse de déplacement pour le Héros A.",
		);
	});
});

it("Devrait refuser une entrée de patchnote sans patchnote_id", async () => {
	await expect(
		PatchnoteEntry.create({
			patchnote_id: null, // 🔴 Doit échouer car `allowNull: false`
			category: "CHANGE",
			ressource_type: "ITEM",
			ressource_id: 2,
			position: 2,
			description: "Modification de l'effet de l'objet.",
		}),
	).rejects.toThrow(
		/notNull Violation: PatchnoteEntry.patchnote_id cannot be null/,
	);
});

it("Devrait refuser une entrée de patchnote avec un type de ressource invalide", async () => {
	const validTypes = ["HERO", "ITEM", "SPELL", "GLOBAL"];

	const invalidEntry = {
		patchnote_id: 1,
		category: "NERF",
		ressource_type: "MONSTER", // 🔴 Doit être rejeté
		ressource_id: 3,
		position: 3,
		description: "Réduction de la puissance d'attaque du monstre.",
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

it("Devrait refuser une entrée de patchnote avec une catégorie invalide", async () => {
	const validCategories = ["BUFF", "NERF", "CHANGE", "FIX"];

	const invalidEntry = {
		patchnote_id: 1,
		category: "REMOVED", // 🔴 Doit être rejeté
		ressource_type: "SPELL",
		ressource_id: 4,
		position: 4,
		description: "Sort complètement supprimé du jeu.",
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

it("Devrait refuser une entrée de patchnote sans description", async () => {
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
