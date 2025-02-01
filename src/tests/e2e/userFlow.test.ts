import request from "supertest";
import testApp from "../utils/setupTestServer"; // Serveur de test
import "../utils/setupTestDB"; // Connexion à la base SQLite in-memory

let adminToken: string | null = null;
let userToken: string | null = null;
let userId: number | null = null;
let patchnoteId: number | null = null;
let itemId: number | null = null;

beforeAll(async () => {
	console.log("🔄 Tentative de connexion pour récupérer le token d'admin...");

	const response = await request(testApp)
		.post("/api/auth/login")
		.send({ login: "admin", password: "password_hash_1" });

	if (response.status === 200) {
		adminToken = response.body.token;
		console.log("✅ Token admin récupéré pour tests.");
	} else {
		console.error("❌ Échec de la connexion administrateur :", response.body);
		throw new Error("🚨 Impossible d'obtenir le token administrateur.");
	}
});

describe("🛠️ Test End-to-End - Parcours utilisateur complet.", () => {
	it("❌ 1. Connexion échoue avec un mauvais mot de passe.", async () => {
		const response = await request(testApp)
			.post("/api/auth/login")
			.send({ login: "admin", password: "wrongpassword" });

		expect(response.status).toBe(401);
	});

	it("✅ 2. Inscription d'un nouvel utilisateur.", async () => {
		const response = await request(testApp)
			.post("/api/users")
			.set("Authorization", `Bearer ${adminToken}`)
			.send({
				login: "testuser",
				password: "securepassword123",
				firstname: "Test",
				lastname: "User",
				nickname: "Tester",
				email: "testuser@example.com",
				twoFactor: false,
			});

		expect(response.status).toBe(201);
		userId = response.body.id;
		console.log(`✅ Utilisateur créé avec ID: ${userId}`);
	});

	it("✅ 3. Connexion de l'utilisateur et récupération du token.", async () => {
		const response = await request(testApp).post("/api/auth/login").send({
			login: "testuser",
			password: "securepassword123",
		});

		expect(response.status).toBe(200);
		userToken = response.body.token;
		console.log(`✅ Token utilisateur récupéré: ${userToken}`);
	});

	it("✅ 4. Consultation des utilisateurs (administrateur).", async () => {
		const response = await request(testApp)
			.get("/api/users")
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("❌ 5. Accès refusé à `/api/users` avec un token utilisateur.", async () => {
		const response = await request(testApp)
			.get("/api/users")
			.set("Authorization", `Bearer ${userToken}`);

		expect(response.status).toBe(403); // Forbidden
	});

	it("✅ 6. Création d'un patchnote par un administrateur.", async () => {
		const response = await request(testApp)
			.post("/api/patchnotes")
			.set("Authorization", `Bearer ${adminToken}`)
			.send({
				version: "1.0.1",
				title: "Nouvelle mise à jour",
				date: "2024-01-01",
				author: "admin",
				content: "Correction de bugs.",
				state: "PUBLISHED",
			});

		expect(response.status).toBe(201);
		patchnoteId = response.body.id;
		console.log(`✅ Patchnote créé avec ID: ${patchnoteId}`);
	});

	it("✅ 7. Consultation des patchnotes (public).", async () => {
		const response = await request(testApp)
			.get("/api/patchnotes")
			.set("Authorization", `Bearer ${userToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("✅ 8. Création d'un item (administrateur).", async () => {
		const response = await request(testApp)
			.post("/api/items")
			.set("Authorization", `Bearer ${adminToken}`)
			.send({
				name: "Épée légendaire",
				category: "WEAPON",
				cost: 500,
				common_bonus: 50,
				active_description: "Augmente l'attaque de 20%",
				active_duration: 60,
				passive_description: "Bonus permanent d'attaque +10",
				passive_duration: 0,
				parent_id: null,
			});

		console.log("📢 Réponse création item:", response.body);
		expect(response.status).toBe(201);
		itemId = response.body.id;
		console.log(`✅ Item créé avec ID: ${itemId}`);
	});

	it("✅ 9. Consultation des items par un utilisateur.", async () => {
		expect(itemId).not.toBeNull();
		const response = await request(testApp)
			.get(`/api/items/${itemId}`)
			.set("Authorization", `Bearer ${userToken}`);

		console.log("📢 Réponse récupération item:", response.body);
		expect(response.status).toBe(200);
	});

	it("✅ 10. Modification d'un item (administrateur).", async () => {
		expect(itemId).not.toBeNull();
		const response = await request(testApp)
			.patch(`/api/items/${itemId}`)
			.set("Authorization", `Bearer ${adminToken}`)
			.send({ cost: 700 });

		console.log("📢 Réponse modification item:", response.body);
		expect(response.status).toBe(200);
	});

	it("✅ 11. Déconnexion de l'utilisateur.", async () => {
		const response = await request(testApp)
			.get("/api/auth/logout")
			.set("Authorization", `Bearer ${userToken}`);

		console.log("📢 Réponse logout:", response.body);
		expect(response.status).toBe(200);
	});

	it("✅ 12. Désactivation de l'utilisateur par un administrateur.", async () => {
		expect(userId).not.toBeNull();
		const response = await request(testApp)
			.delete(`/api/users/${userId}/role`)
			.set("Authorization", `Bearer ${adminToken}`);

		console.log("📢 Réponse désactivation utilisateur:", response.body);
		expect(response.status).toBe(200);
		expect(response.body.message).toContain(`Rôle de l'utilisateur ${userId} supprimé avec succès (compte désactivé).`);
	});
});
