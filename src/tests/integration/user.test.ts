import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à la base SQLite in-memory

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
		console.error("❌ Login failed:", response.body);
		throw new Error("🚨 Impossible d'obtenir le token d'authentification");
	}
});

describe("User API", () => {
	test("GET /api/users - should return users if authenticated as admin", async () => {
		const response = await request(testApp)
			.get("/api/users")
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	test("POST /api/users - should create a new user", async () => {
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

	test("GET /api/users/:id - should return a specific user", async () => {
		expect(userId).not.toBeNull();

		const response = await request(testApp)
			.get(`/api/users/${userId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", userId);
	});

	test("PATCH /api/users/:id - should update an existing user", async () => {
		expect(userId).not.toBeNull();

		const response = await request(testApp)
			.patch(`/api/users/${userId}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({ firstname: "UpdatedTest" });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("firstname", "UpdatedTest");
	});

	test("GET /api/users/:id/role - should return user role", async () => {
		expect(userId).not.toBeNull();

		const response = await request(testApp)
			.get(`/api/users/${userId}/role`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("role");

		userRoleId = response.body.role.id;
	});

	// PATCH /api/users/:id/role - Modifier le rôle d'un utilisateur (admin)
	test("PATCH /api/users/:id/role - should update user role", async () => {
		expect(userId).not.toBeNull();

		const response = await request(testApp)
			.patch(`/api/users/${userId}/role`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({ newRoleId: 1 });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message", "Rôle mis à jour avec succès");
	});

	// DELETE /api/users/:id/role - Supprimer le rôle d'un utilisateur (admin)
	test("DELETE /api/users/:id/role - should remove user role", async () => {
		expect(userId).not.toBeNull();

		const response = await request(testApp)
			.delete(`/api/users/${userId}/role`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message");
	});
});
