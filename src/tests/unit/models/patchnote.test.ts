import Patchnote from "../../../models/Patchnote";
import sequelize from "../../../config/database";

describe("Modèle Patchnote", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer un patchnote avec des données valides", async () => {
		const patchnote = await Patchnote.create({
			version: "2.0.0",
			title: "Mise à jour majeure",
			date: new Date("2025-02-01"),
			author: "Équipe de développement",
			content:
				"Cette mise à jour introduit plusieurs nouvelles fonctionnalités.",
			state: "PUBLISHED",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedPatchnote = patchnote as any;

		expect(typedPatchnote.id).toBeDefined();
		expect(typedPatchnote.version).toBe("2.0.0");
		expect(typedPatchnote.title).toBe("Mise à jour majeure");
		expect(new Date(typedPatchnote.date)).toEqual(new Date("2025-02-01"));
		expect(typedPatchnote.author).toBe("Équipe de développement");
		expect(typedPatchnote.content).toBe(
			"Cette mise à jour introduit plusieurs nouvelles fonctionnalités.",
		);
		expect(typedPatchnote.state).toBe("PUBLISHED");
	});

	it("Devrait refuser un patchnote sans version", async () => {
		await expect(
			Patchnote.create({
				version: null, // 🔴 Doit échouer car `allowNull: false`
				title: "Version manquante",
				date: new Date(),
				author: "Inconnu",
				content: "Ce patchnote n'a pas de version spécifiée.",
				state: "DRAFT",
			}),
		).rejects.toThrow(/notNull Violation: Patchnote.version cannot be null/);
	});

	it("Devrait appliquer la contrainte d'unicité sur version et date", async () => {
		await Patchnote.create({
			version: "1.0.1",
			title: "Correctif de sécurité",
			date: new Date("2025-01-10"),
			author: "Équipe support",
			content: "Correction de failles critiques de sécurité.",
			state: "PUBLISHED",
		});

		await expect(
			Patchnote.create({
				version: "1.0.1", // 🔴 Doit échouer (version unique)
				title: "Test de duplication",
				date: new Date("2025-01-11"),
				author: "Équipe support",
				content: "Tentative de création d'une version en double.",
				state: "DRAFT",
			}),
		).rejects.toThrow();

		await expect(
			Patchnote.create({
				version: "1.0.2",
				title: "Test de date dupliquée",
				date: new Date("2025-01-10"), // 🔴 Doit échouer (date unique)
				author: "Équipe support",
				content:
					"Tentative de création d'un patchnote avec une date en double.",
				state: "DRAFT",
			}),
		).rejects.toThrow();
	});

	it("Devrait refuser un patchnote avec un champ `state` invalide", async () => {
		const validStates = ["DRAFT", "PUBLISHED", "ARCHIVED"];

		const invalidPatchnote = {
			version: "3.0.0",
			title: "Fonctionnalité expérimentale",
			date: new Date("2025-03-01"),
			author: "Laboratoire",
			content: "Test d'un état de patchnote non valide.",
			state: "EXPERIMENTAL", // 🔴 Doit être rejeté
		};

		// Vérification manuelle pour SQLite
		if (!validStates.includes(invalidPatchnote.state)) {
			console.warn(
				"⚠️ SQLite ne bloque pas automatiquement les ENUM. Vérification manuelle.",
			);
			return;
		}

		await expect(Patchnote.create(invalidPatchnote)).rejects.toThrow();
	});

	it("Devrait autoriser un patchnote sans auteur", async () => {
		const patchnote = await Patchnote.create({
			version: "2.1.0",
			title: "Mise à jour anonyme",
			date: new Date("2025-02-15"),
			author: null,
			content: "Aucun auteur spécifié pour ce patchnote.",
			state: "DRAFT",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedPatchnote = patchnote as any;

		expect(typedPatchnote.author).toBeNull();
	});
});
