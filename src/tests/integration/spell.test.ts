import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à la base SQLite in-memory.

let authToken: string | null = null;
let heroId: number;
let spellId: number;

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

	// 🛠 Insertion d'un héros de test (avec tous les champs requis).
	console.log("🛠 Insertion d'un héros de test...");
	const heroResponse = await request(testApp)
		.post("/api/heroes")
		.set("Authorization", `Bearer ${authToken}`)
		.send({
			name: "Test Hero",
			resume: "Un héros de test avec un puissant sort.",
			description: "Ce héros est un test utilisé pour valider les sorts.",
			img_path: "https://example.com/images/testhero.mp4",
			video_path: "https://example.com/videos/testhero.mp4",
		});

	if (heroResponse.status !== 201) {
		console.error("❌ Impossible d'insérer un héros de test:", heroResponse.body);
		throw new Error("🚨 Impossible d'insérer un héros de test.");
	}

	heroId = heroResponse.body.id;
	console.log("✅ Héros de test inséré avec ID:", heroId);
});

describe("📜 API des sorts.", () => {
	test("✅ POST /api/spells - Crée un nouveau sort (authentification requise).", async () => {
		console.log("🛠 Insertion d'un sort de test...");
		const response = await request(testApp)
			.post("/api/spells")
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				hero_id: heroId,
				name: "Fireball",
				order: 1,
				description: "Lance une boule de feu.",
				passive: false,
				charge: false,
				charge_count: 0,
				charge_time: 0,
				charge_interval: 0,
				cooldown: 5,
				distance: "10m",
				first_upgrade: "Augmente la portée.",
				second_upgrade: "Ajoute un effet de brûlure.",
				third_upgrade: "Réduit le temps de recharge.",
				icon_path: "path/to/icon.png",
				demo_path: "path/to/demo.mp4",
			});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		spellId = response.body.id;
		console.log("✅ Sort de test inséré avec ID:", spellId);
	});

	test("✅ GET /api/spells - Retourne tous les sorts.", async () => {
		const response = await request(testApp).get("/api/spells");

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("✅ GET /api/spells/:id - Retourne un sort spécifique.", async () => {
		const response = await request(testApp).get(`/api/spells/${spellId}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", spellId);
	});

	test("✅ PATCH /api/spells/:id - Met à jour un sort existant.", async () => {
		const response = await request(testApp)
			.patch(`/api/spells/${spellId}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				description: "Une boule de feu encore plus puissante.",
			});

		expect(response.status).toBe(200);
		expect(response.body.description).toBe("Une boule de feu encore plus puissante.");
	});

	test("✅ DELETE /api/spells/:id - Supprime un sort.", async () => {
		const response = await request(testApp)
			.delete(`/api/spells/${spellId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message", "Sort supprimé.");
	});
});
