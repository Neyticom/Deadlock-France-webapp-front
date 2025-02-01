import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à SQLite in-memory

let authToken: string | null = null;
let testKeywordId: number;

beforeAll(async () => {
	console.log("🔄 Tentative de connexion pour récupérer le token...");

	const response = await request(testApp)
		.post("/api/auth/login")
		.send({ login: "admin", password: "password_hash_1" });

	if (response.status === 200) {
		authToken = response.body.token;
		console.log("✅ Token récupéré pour tests:", authToken);
	} else {
		console.error("❌ Échec de la connexion lors des tests :", response.body);
		throw new Error("🚨 Impossible d'obtenir un token d'authentification");
	}

	console.log("🛠 Insertion d'un keyword de test...");

	const createKeywordResponse = await request(testApp)
		.post("/api/keywords")
		.set("Authorization", `Bearer ${authToken}`)
		.send({
			ressource_type: "HERO",
			ressource_id: 1,
			value: "Legendary",
		});

	if (createKeywordResponse.status === 201) {
		testKeywordId = createKeywordResponse.body.id;
		console.log("✅ Keyword de test inséré avec ID:", testKeywordId);
	} else {
		console.error(
			"❌ Erreur lors de l'insertion du keyword:",
			createKeywordResponse.body,
		);
		throw new Error("🚨 Impossible d'insérer un keyword de test.");
	}
});

describe("🔑 API des mots-clés.", () => {
	test("✅ GET /api/keywords - Retourne tous les mots-clés (authentification requise).", async () => {
		const response = await request(testApp)
			.get("/api/keywords")
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("✅ GET /api/keywords/:id - Retourne un mot-clé spécifique (authentification requise).", async () => {
		const response = await request(testApp)
			.get(`/api/keywords/${testKeywordId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", testKeywordId);
		expect(response.body).toHaveProperty("ressource_type", "HERO");
		expect(response.body).toHaveProperty("value", "Legendary");
	});

	test("✅ POST /api/keywords - Crée un nouveau mot-clé (authentification requise).", async () => {
		const response = await request(testApp)
			.post("/api/keywords")
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				ressource_type: "ITEM",
				ressource_id: 2,
				value: "Rare",
			});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("ressource_type", "ITEM");
		expect(response.body.value).toBe("Rare");
	});

	test("✅ PATCH /api/keywords/:id - Met à jour un mot-clé existant (authentification requise).", async () => {
		const response = await request(testApp)
			.patch(`/api/keywords/${testKeywordId}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({ value: "Mythic" });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("value", "Mythic");
	});

	test("✅ DELETE /api/keywords/:id - Supprime un mot-clé (authentification requise).", async () => {
		const response = await request(testApp)
			.delete(`/api/keywords/${testKeywordId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message", "Mot-clé supprimé.");
	});

	test("❌ GET /api/keywords - Retourne 401 si aucun token n'est fourni.", async () => {
		const response = await request(testApp).get("/api/keywords");

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty(
			"error",
			"Accès refusé, token manquant.",
		);
	});

	test("❌ DELETE /api/keywords/:id - Retourne 401 si aucun token n'est fourni.", async () => {
		const response = await request(testApp).delete(
			`/api/keywords/${testKeywordId}`,
		);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty(
			"error",
			"Accès refusé, token manquant.",
		);
	});

	test("❌ GET /api/keywords/:id - Retourne 404 si le mot-clé n'existe pas.", async () => {
		const response = await request(testApp)
			.get("/api/keywords/999")
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error", "Mot-clé introuvable.");
	});
});
