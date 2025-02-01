import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à la base SQLite in-memory.

let authToken: string | null = null;

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
		throw new Error("🚨 Impossible d'obtenir un token d'authentification.");
	}
});

describe("🔑 API d'authentification.", () => {
	test("✅ POST /api/auth/login - Authentification réussie et retour d'un token.", async () => {
		const response = await request(testApp)
			.post("/api/auth/login")
			.send({ login: "admin", password: "password_hash_1" });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("token");
		expect(typeof response.body.token).toBe("string");
	});

	test("✅ GET /api/auth/logout - Retourne un message de déconnexion réussie.", async () => {
		const response = await request(testApp)
			.get("/api/auth/logout")
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ message: "Déconnexion réussie." });
	});

	test("❌ GET /api/users - Retourne 401 si aucun token n'est fourni.", async () => {
		const response = await request(testApp).get("/api/users");
		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty(
			"error",
			"Accès refusé, token manquant.",
		);
	});

	test("❌ GET /api/users - Retourne 403 si l'utilisateur n'est pas administrateur.", async () => {
		// Connexion avec "johndoe" qui est un utilisateur normal (non-admin).
		const userResponse = await request(testApp)
			.post("/api/auth/login")
			.send({ login: "johndoe", password: "password_hash_3" });

		const userToken = userResponse.body.token;

		const response = await request(testApp)
			.get("/api/users")
			.set("Authorization", `Bearer ${userToken}`); // Token valide d'un utilisateur non-admin

		expect(response.status).toBe(403);
		expect(response.body).toHaveProperty(
			"error",
			"Accès refusé, privilèges insuffisants.",
		);
	});

	test("✅ GET /api/users - Retourne la liste des utilisateurs si authentifié en tant qu'administrateur.", async () => {
		const response = await request(testApp)
			.get("/api/users")
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});
});
