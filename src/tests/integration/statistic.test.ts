import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à la base SQLite in-memory.

let authToken: string | null = null;
let statisticId: number | null = null;

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
});

describe("📊 API des statistiques.", () => {
	// Test de création ou mise à jour d'une statistique.
	test("✅ PUT /api/stats - Crée ou met à jour une statistique.", async () => {
		console.log("🛠 Insertion ou mise à jour d'une statistique de test...");

		const response = await request(testApp)
			.put("/api/stats")
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				origin: "homepage",
				count: 1,
				date: new Date().toISOString(), // Format ISO valide.
				type: "VIEW",
			});

		console.log("🔎 Réponse upsert statistique:", response.body);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id");

		// Vérification et stockage de l'ID.
		statisticId = response.body.id;
		console.log("✅ Statistique de test insérée avec ID:", statisticId);
		expect(typeof statisticId).toBe("number");
	});

	// Test de récupération des statistiques.
	test("✅ GET /api/stats - Retourne toutes les statistiques.", async () => {
		const response = await request(testApp)
			.get("/api/stats")
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	// Test de filtrage des statistiques par date.
	test("✅ GET /api/stats/search - Filtre les statistiques par date.", async () => {
		const startDate = new Date();
		startDate.setDate(startDate.getDate() - 1); // Hier
		const endDate = new Date(); // Aujourd'hui

		const response = await request(testApp)
			.get("/api/stats/search")
			.query({
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				type: "VIEW",
			})
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	// Vérifie que la mise à jour avec PUT fonctionne bien.
	test("✅ PUT /api/stats - Met à jour une statistique existante.", async () => {
		// Vérifie que l'ID est bien défini.
		expect(statisticId).not.toBeNull();
		console.log(
			`🔄 Tentative de mise à jour de la statistique ID: ${statisticId}`,
		);

		const response = await request(testApp)
			.put("/api/stats")
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				origin: "homepage",
				count: 1,
				date: new Date().toISOString(),
				type: "CLICK",
			});

		console.log("🔎 Réponse mise à jour statistique:", response.body);
		console.log("🔎 Statut HTTP:", response.status);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("type", "CLICK");
	});
});
