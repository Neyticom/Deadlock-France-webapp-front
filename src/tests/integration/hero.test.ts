import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à la base SQLite in-memory.

let authToken: string;
let heroId: number; // ✅ Stocke l'ID du héros de test.

beforeAll(async () => {
	console.log("🔄 Tentative de connexion pour récupérer le token...");

	const loginResponse = await request(testApp)
		.post("/api/auth/login")
		.send({ login: "admin", password: "password_hash_1" });

	if (loginResponse.status === 200) {
		authToken = loginResponse.body.token;
		console.log("✅ Token récupéré pour tests:", authToken);
	} else {
		console.error(
			"❌ Échec de la connexion lors des tests :",
			loginResponse.body,
		);
		throw new Error("🚨 Impossible d'obtenir un token d'authentification.");
	}

	console.log("🛠 Insertion d'un héros de test...");

	const createHeroResponse = await request(testApp)
		.post("/api/heroes")
		.set("Authorization", `Bearer ${authToken}`)
		.send({
			name: "TestHero",
			resume: "Une courte description du héros.",
			description: "Un héros pour les tests.",
			img_path: "https://example.com/images/testhero.png",
			video_path: "https://example.com/videos/testhero.mp4",
		});

	if (createHeroResponse.status === 201) {
		heroId = createHeroResponse.body.id;
		console.log("✅ Héros de test inséré avec ID:", heroId);
	} else {
		console.error(
			"❌ Erreur lors de l'insertion du héros:",
			createHeroResponse.body,
		);
		throw new Error("🚨 Impossible d'insérer un héros de test.");
	}
});

describe("🦸 API des héros.", () => {
	test("✅ GET /api/heroes - Retourne la liste des héros.", async () => {
		const response = await request(testApp).get("/api/heroes");
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	test("✅ GET /api/heroes/:id - Retourne un héros spécifique.", async () => {
		const response = await request(testApp).get(`/api/heroes/${heroId}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", heroId);
	});

	test("✅ POST /api/heroes - Crée un nouveau héros (authentification requise).", async () => {
		const response = await request(testApp)
			.post("/api/heroes")
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				name: "NewHero",
				resume: "Description du nouveau héros.",
				description: "Un nouveau héros avec des capacités uniques.",
				img_path: "https://example.com/images/newhero.png",
				video_path: "https://example.com/videos/newhero.mp4",
			});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.name).toBe("NewHero");
	});

	test("✅ PATCH /api/heroes/:id - Met à jour un héros existant (authentification requise).", async () => {
		const response = await request(testApp)
			.patch(`/api/heroes/${heroId}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({ description: "Description du héros mise à jour." });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty(
			"description",
			"Description du héros mise à jour.",
		);
	});

	test("✅ DELETE /api/heroes/:id - Supprime un héros (authentification requise).", async () => {
		const response = await request(testApp)
			.delete(`/api/heroes/${heroId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
	});

	test("❌ POST /api/heroes - Retourne 401 si aucun token n'est fourni.", async () => {
		const response = await request(testApp).post("/api/heroes").send({
			name: "UnauthorizedHero",
			resume: "Ne devrait pas être créé",
			description: "Token d'authentification manquant",
			img_path: "https://example.com/images/unauthorizedhero.png",
			video_path: "https://example.com/videos/unauthorizedhero.mp4",
		});

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty(
			"error",
			"Accès refusé, token manquant.",
		);
	});

	test("❌ DELETE /api/heroes/:id - Retourne 401 si aucun token n'est fourni.", async () => {
		const response = await request(testApp).delete(`/api/heroes/${heroId}`);
		expect(response.status).toBe(401);
	});

	test("❌ GET /api/heroes/:id - Retourne 404 si le héros n'existe pas.", async () => {
		const response = await request(testApp).get("/api/heroes/9999");
		expect(response.status).toBe(404);
	});
});
