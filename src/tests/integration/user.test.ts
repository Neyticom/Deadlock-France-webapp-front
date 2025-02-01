import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à la base SQLite in-memory.

let authToken: string | null = null;
let userId: number | null = null;
let userRoleId: number | null = null;

beforeAll(async () => {
	console.log("🔄 Tentative de connexion pour récupérer le token d'admin...");

	const response = await request(testApp)
		.post("/api/auth/login")
		.send({ login: "admin", password: "password_hash_1" });

	if (response.status === 200) {
		authToken = response.body.token;
		console.log("✅ Token récupéré pour tests:", authToken);
	} else {
		console.error("❌ Échec de connexion :", response.body);
		throw new Error("🚨 Impossible d'obtenir le token d'authentification");
	}
});

describe("👤 API des utilisateurs.", () => {
	test("✅ GET /api/users - Retourne la liste des utilisateurs.", async () => {
		const response = await request(testApp)
			.get("/api/users")
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	test("✅ POST /api/users - Crée un nouvel utilisateur.", async () => {
		console.log("🛠 Création d'un nouvel utilisateur...");

		const response = await request(testApp)
			.post("/api/users")
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				login: "testuser",
				password: "securepassword123",
				firstname: "Test",
				lastname: "User",
				nickname: "Tester",
				email: "testuser@example.com",
				twoFactor: false,
			});

		console.log("🔎 Réponse création utilisateur:", response.body);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");

		userId = response.body.id;
		console.log("✅ Utilisateur de test créé avec ID:", userId);
		expect(typeof userId).toBe("number");
	});

	test("✅ GET /api/users/:id - Retourne un utilisateur spécifique.", async () => {
		expect(userId).not.toBeNull();

		const response = await request(testApp)
			.get(`/api/users/${userId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", userId);
	});

	test("✅ PATCH /api/users/:id - Met à jour un utilisateur existant.", async () => {
		expect(userId).not.toBeNull();

		const response = await request(testApp)
			.patch(`/api/users/${userId}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({ firstname: "UpdatedTest" });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("firstname", "UpdatedTest");
	});

	test("✅ GET /api/users/:id/role - Retourne le rôle de l'utilisateur.", async () => {
		expect(userId).not.toBeNull();

		const response = await request(testApp)
			.get(`/api/users/${userId}/role`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("role");

		userRoleId = response.body.role.id;
	});

	// Modifier le rôle d'un utilisateur.
	test("✅ PATCH /api/users/:id/role - Met à jour le rôle d'un utilisateur.", async () => {
		expect(userId).not.toBeNull();

		const response = await request(testApp)
			.patch(`/api/users/${userId}/role`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({ newRoleId: 1 });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty(
			"message",
			"Rôle mis à jour avec succès.",
		);
	});

	// Supprimer le rôle d'un utilisateur (désactivation du compte).
	test("✅ DELETE /api/users/:id/role - Supprime le rôle d'un utilisateur.", async () => {
		expect(userId).not.toBeNull();

		const response = await request(testApp)
			.delete(`/api/users/${userId}/role`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message");
	});
});
