import request from "supertest";
import testApp from "../utils/setupTestServer";
import database from "../../models"; // Import des modèles pour la BDD
import "../utils/setupTestDB"; // Connexion à la base SQLite in-memory

let authToken: string | null = null;
let patchnoteId: number;
let patchnoteEntryId: number;

beforeAll(async () => {
	console.log("🔄 Tentative de connexion pour récupérer le token...");

	const response = await request(testApp)
		.post("/api/auth/login")
		.send({ login: "admin", password: "password_hash_1" });

	if (response.status === 200) {
		authToken = response.body.token;
		console.log("✅ Token récupéré pour tests:", authToken);
	} else {
		console.error("❌ Login failed during tests:", response.body);
		throw new Error("🚨 Impossible d'obtenir un token d'authentification");
	}

	// 🛠 Insertion d'un patchnote avant d'ajouter des entrées
	console.log("🛠 Insertion d'un patchnote de test...");
	const patchnote = await database.Patchnote.create({
		version: "1.0.0",
		title: "Patch Initial",
		date: new Date(),
		author: "Admin",
		content: "Premier patch du jeu",
		state: "PUBLISHED",
	});

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	patchnoteId = (patchnote as any).id;
	if (!patchnoteId) throw new Error("🚨 Impossible de récupérer l'ID du patchnote de test");

	console.log("✅ Patchnote de test inséré avec ID:", patchnoteId);
});

describe("PatchnoteEntry API", () => {
	test("POST /api/patchnotes/:id/entries - should create a new patchnote entry", async () => {
		console.log("🛠 Création d'une entrée de patchnote...");

		const response = await request(testApp)
			.post(`/api/patchnotes/${patchnoteId}/entries`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				patchnote_id: patchnoteId,
				category: "BUFF",
				ressource_type: "ITEM",
				ressource_id: 1,
				position: 1,
				description: "Augmentation des dégâts de l'épée.",
			});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");

		patchnoteEntryId = response.body.id; // Stocke l'ID pour les prochains tests
		console.log("✅ Entrée de patchnote insérée avec ID:", patchnoteEntryId);
	});

	test("GET /api/patchnotes/:id/entries - should return all entries of a patchnote", async () => {
		const response = await request(testApp)
			.get(`/api/patchnotes/${patchnoteId}/entries`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("GET /api/patchnotes/:id/entries/:id - should return a specific patchnote entry", async () => {
		const response = await request(testApp)
			.get(`/api/patchnotes/${patchnoteId}/entries/${patchnoteEntryId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", patchnoteEntryId);
	});

	test("PATCH /api/patchnotes/:id/entries/:id - should update a patchnote entry", async () => {
		const response = await request(testApp)
			.patch(`/api/patchnotes/${patchnoteId}/entries/${patchnoteEntryId}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({ description: "Réduction légère des dégâts de l'épée" });

		expect(response.status).toBe(200);
		expect(response.body.description).toBe("Réduction légère des dégâts de l'épée");
	});

	test("DELETE /api/patchnotes/:id/entries/:id - should delete a patchnote entry", async () => {
		const response = await request(testApp)
			.delete(`/api/patchnotes/${patchnoteId}/entries/${patchnoteEntryId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message", "Patchnote entry deleted");

		// Vérifier que l'entrée n'existe plus
		const checkResponse = await request(testApp)
			.get(`/api/patchnotes/${patchnoteId}/entries/${patchnoteEntryId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(checkResponse.status).toBe(404);
	});
});
