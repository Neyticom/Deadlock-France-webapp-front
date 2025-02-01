import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à SQLite in-memory.

let authToken: string | null = null;
let testPatchnoteId: number;

beforeAll(async () => {
	console.log("🔄 Tentative de connexion pour récupérer le token...");

	const response = await request(testApp)
		.post("/api/auth/login")
		.send({ login: "admin", password: "password_hash_1" });

	if (response.status === 200) {
		authToken = response.body.token;
		console.log("✅ Token récupéré pour tests:", authToken);
	} else {
		console.error("❌ Échec de connexion lors des tests :", response.body);
		throw new Error("🚨 Impossible d'obtenir un token d'authentification.");
	}

	console.log("🛠 Insertion d'un patchnote de test...");

	const createPatchnoteResponse = await request(testApp)
		.post("/api/patchnotes")
		.set("Authorization", `Bearer ${authToken}`)
		.send({
			version: "1.0.0",
			title: "Mise à jour initiale",
			date: "2024-01-01T00:00:00.000Z",
			author: "Admin",
			content: "Ajout de nouvelles fonctionnalités.",
			state: "PUBLISHED",
		});

	if (createPatchnoteResponse.status === 201) {
		testPatchnoteId = createPatchnoteResponse.body.id;
		console.log("✅ Patchnote de test inséré avec ID:", testPatchnoteId);
	} else {
		console.error(
			"❌ Erreur lors de l'insertion du patchnote:",
			createPatchnoteResponse.body,
		);
		throw new Error("🚨 Impossible d'insérer un patchnote de test.");
	}
});

describe("📜 API des patchnotes.", () => {
	test("✅ GET /api/patchnotes - Retourne tous les patchnotes.", async () => {
		const response = await request(testApp).get("/api/patchnotes");

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("✅ GET /api/patchnotes/:id - Retourne un patchnote spécifique.", async () => {
		const response = await request(testApp).get(
			`/api/patchnotes/${testPatchnoteId}`,
		);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", testPatchnoteId);
		expect(response.body).toHaveProperty("title", "Mise à jour initiale");
	});

	test("✅ POST /api/patchnotes - Crée un nouveau patchnote (authentification requise).", async () => {
		const response = await request(testApp)
			.post("/api/patchnotes")
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				version: "1.1.0",
				title: "Deuxième mise à jour",
				date: "2024-02-01T00:00:00.000Z",
				author: "Admin",
				content: "Amélioration des performances.",
				state: "PUBLISHED",
			});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.title).toBe("Deuxième mise à jour");
	});

	test("✅ PATCH /api/patchnotes/:id - Met à jour un patchnote existant (authentification requise).", async () => {
		const response = await request(testApp)
			.patch(`/api/patchnotes/${testPatchnoteId}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({ title: "Titre mis à jour" });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("title", "Titre mis à jour");
	});

	test("✅ PUT /api/patchnotes/:id - Remplace entièrement un patchnote existant (authentification requise).", async () => {
		const response = await request(testApp)
			.put(`/api/patchnotes/${testPatchnoteId}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				version: "1.0.1",
				title: "Patchnote complètement remplacé",
				date: "2024-01-05T00:00:00.000Z",
				author: "Admin",
				content: "Correctifs divers.",
				state: "DRAFT",
			});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty(
			"title",
			"Patchnote complètement remplacé",
		);
		expect(response.body).toHaveProperty("state", "DRAFT");
	});

	test("✅ DELETE /api/patchnotes/:id - Supprime un patchnote (authentification requise).", async () => {
		const response = await request(testApp)
			.delete(`/api/patchnotes/${testPatchnoteId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message", "Patchnote supprimé.");
	});

	test("❌ GET /api/patchnotes/:id - Retourne 404 si le patchnote n'existe pas.", async () => {
		const response = await request(testApp).get("/api/patchnotes/999");

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error", "Patchnote introuvable.");
	});

	test("❌ POST /api/patchnotes - Retourne 401 si aucun token n'est fourni.", async () => {
		const response = await request(testApp).post("/api/patchnotes").send({
			version: "1.2.0",
			title: "Nouvelle mise à jour",
			date: "2024-03-01T00:00:00.000Z",
			author: "Admin",
			content: "Nouveaux changements.",
			state: "PUBLISHED",
		});

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty(
			"error",
			"Accès refusé, token manquant.",
		);
	});
});
