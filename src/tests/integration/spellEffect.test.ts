import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à la base SQLite in-memory.

let authToken: string | null = null;
let heroId: number | null = null;
let spellId: number | null = null;
let spellEffectId: number | null = null;

beforeAll(async () => {
	console.log("🔄 Tentative de connexion pour récupérer le token...");

	const response = await request(testApp)
		.post("/api/auth/login")
		.send({ login: "admin", password: "password_hash_1" });

	if (response.status !== 200) {
		console.error("❌ Échec de connexion :", response.body);
		throw new Error("🚨 Impossible d'obtenir le token d'authentification.");
	}

	authToken = response.body.token;
	console.log("✅ Token récupéré pour tests:", authToken);

	// 🛠 Insertion d'un héros de test.
	console.log("🛠 Insertion d'un héros de test...");
	const heroResponse = await request(testApp)
		.post("/api/heroes")
		.set("Authorization", `Bearer ${authToken}`)
		.send({
			name: "Test Hero",
			resume: "Un héros pour les tests.",
			description: "Ce héros est utilisé pour tester la création de sorts.",
			img_path: "https://example.com/images/testhero.jpg",
			video_path: "https://example.com/videos/testhero.mp4",
		});

	if (heroResponse.status !== 201) {
		console.error("❌ Erreur lors de l'insertion du héros:", heroResponse.body);
		throw new Error("🚨 Impossible d'insérer un héros de test.");
	}

	heroId = heroResponse.body.id;
	console.log("✅ Héros de test inséré avec ID:", heroId);

	// 🛠 Insertion d'un sort de test
	console.log("🛠 Insertion d'un sort de test...");
	const spellResponse = await request(testApp)
		.post("/api/spells")
		.set("Authorization", `Bearer ${authToken}`)
		.send({
			hero_id: heroId,
			name: "Test Spell",
			order: 1,
			description: "Sort de test pour les tests API.",
			passive: false,
			charge: true,
			charge_count: 3,
			charge_time: 2,
			charge_interval: 1,
			cooldown: 10,
			distance: "Melee",
			first_upgrade: "Amélioration 1",
			second_upgrade: "Amélioration 2",
			third_upgrade: "Amélioration 3",
			icon_path: "https://example.com/icons/spell.png",
			demo_path: "https://example.com/demos/spell.mp4",
		});

	if (spellResponse.status !== 201) {
		console.error("❌ Erreur lors de l'insertion du sort:", spellResponse.body);
		throw new Error("🚨 Impossible d'insérer un sort de test.");
	}

	spellId = spellResponse.body.id;
	console.log("✅ Sort de test inséré avec ID:", spellId);
});

describe("📜 API des effets de sorts.", () => {
	test("✅ POST /api/spells/:id/effects - Crée un nouvel effet de sort.", async () => {
		console.log("🛠 Insertion d'un effet de test...");
		const response = await request(testApp)
			.post(`/api/spells/${spellId}/effects`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				spell_id: spellId,
				order: 1,
				effect: "Augmente la vitesse d'attaque de 20%",
			});

		console.log("🔎 Réponse insertion effet:", response.body);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");

		spellEffectId = response.body.id;
		console.log("✅ Effet de test inséré avec ID:", spellEffectId);
	});

	test("✅ GET /api/spells/:id/effects - Retourne tous les effets d'un sort.", async () => {
		const response = await request(testApp)
			.get(`/api/spells/${spellId}/effects`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("✅ GET /api/spells/:id/effects/:id - Retourne un effet spécifique d'un sort.", async () => {
		const response = await request(testApp)
			.get(`/api/spells/${spellId}/effects/${spellEffectId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", spellEffectId);
		expect(response.body).toHaveProperty(
			"effect",
			"Augmente la vitesse d'attaque de 20%",
		);
	});

	test("✅ PATCH /api/spells/:id/effects/:id - Met à jour un effet existant d'un sort.", async () => {
		const response = await request(testApp)
			.patch(`/api/spells/${spellId}/effects/${spellEffectId}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({ effect: "Effet mis à jour." });

		expect(response.status).toBe(200);
		expect(response.body.effect).toBe("Effet mis à jour.");
	});

	test("✅ DELETE /api/spells/:id/effects/:id - Supprime un effet de sort.", async () => {
		const response = await request(testApp)
			.delete(`/api/spells/${spellId}/effects/${spellEffectId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message", "Effet supprimé.");
	});
});
