import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à SQLite in-memory.

let authToken: string | null = null;
let testItemId: number;
let testEffectId: number;

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

	console.log("🛠 Insertion d'un item et d'un effet de test...");

	// Création d'un item de test
	const createItemResponse = await request(testApp)
		.post("/api/items")
		.set("Authorization", `Bearer ${authToken}`)
		.send({
			name: "Test Item",
			category: "WEAPON",
			cost: 1000,
			common_bonus: 5,
			active_description: "Augmente l'attaque.",
			active_duration: 10,
			passive_description: "Augmente la défense.",
			passive_duration: 15,
		});

	if (createItemResponse.status === 201) {
		testItemId = createItemResponse.body.id;
		console.log("✅ Item de test inséré avec ID:", testItemId);
	} else {
		console.error(
			"❌ Erreur lors de l'insertion de l'item:",
			createItemResponse.body,
		);
		throw new Error("🚨 Impossible d'insérer un item de test.");
	}

	// Création d'un effet de test
	const createEffectResponse = await request(testApp)
		.post(`/api/items/${testItemId}/effects`)
		.set("Authorization", `Bearer ${authToken}`)
		.send({
			item_id: testItemId, // Ajout explicite de l'item_id
			type: "COMMON",
			effect: "Augmente la puissance d'attaque.",
		});

	if (createEffectResponse.status === 201) {
		testEffectId = createEffectResponse.body.id;
		console.log("✅ Effet de test inséré avec ID:", testEffectId);
	} else {
		console.error(
			"❌ Erreur lors de l'insertion de l'effet:",
			createEffectResponse.body,
		);
		throw new Error("🚨 Impossible d'insérer un effet de test.");
	}
});

describe("✨ API des effets d'items.", () => {
	test("✅ GET /api/items/:id/effects - Retourne tous les effets d'un item.", async () => {
		const response = await request(testApp).get(
			`/api/items/${testItemId}/effects`,
		);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("✅ GET /api/items/:id/effects/:id - Retourne un effet spécifique.", async () => {
		const response = await request(testApp).get(
			`/api/items/${testItemId}/effects/${testEffectId}`,
		);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", testEffectId);
		expect(response.body).toHaveProperty("type", "COMMON");
		expect(response.body).toHaveProperty(
			"effect",
			"Augmente la puissance d'attaque.",
		);
	});

	test("✅ POST /api/items/:id/effects - Crée un nouvel effet d'item (authentification requise).", async () => {
		const response = await request(testApp)
			.post(`/api/items/${testItemId}/effects`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				item_id: testItemId,
				type: "ACTIVE",
				effect: "Accorde une invulnérabilité temporaire.",
			});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("type", "ACTIVE");
		expect(response.body.effect).toBe(
			"Accorde une invulnérabilité temporaire.",
		);
	});

	test("✅ PATCH /api/items/:id/effects/:id - Met à jour un effet d'item existant.", async () => {
		const response = await request(testApp)
			.patch(`/api/items/${testItemId}/effects/${testEffectId}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({ effect: "Augmentation de l'attaque améliorée." });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty(
			"effect",
			"Augmentation de l'attaque améliorée.",
		);
	});

	test("✅ DELETE /api/items/:id/effects/:id - Supprime un effet d'item.", async () => {
		const response = await request(testApp)
			.delete(`/api/items/${testItemId}/effects/${testEffectId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message", "Effet d'objet supprimé.");
	});
});
