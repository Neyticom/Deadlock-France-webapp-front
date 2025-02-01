import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à SQLite in-memory.
import database from "../../models";
import logService from "../../services/logService";
import type { Request } from "express";

let adminToken: string | null = null;
let adminId: number | null = null;
let testLogId: number | null = null;

beforeAll(async () => {
	console.log("🔄 Tentative de connexion en tant qu'administrateur...");

	// 🔄 Connexion pour récupérer le token administrateur.
	const response = await request(testApp)
		.post("/api/auth/login")
		.send({ login: "admin", password: "password_hash_1" });

	if (response.status === 200) {
		adminToken = response.body.token;
		console.log("✅ Token administrateur récupéré:", adminToken);
	} else {
		console.error("❌ Échec de connexion administrateur:", response.body);
		throw new Error("🚨 Impossible d'obtenir le token administrateur.");
	}

	// 🔄 Récupération de l'ID de l'administrateur.
	const adminUser = await database.User.findOne({ where: { login: "admin" } }) as unknown as { id: number };
	if (!adminUser) {
		throw new Error("🚨 Impossible de récupérer l'utilisateur administrateur en base.");
	}
	adminId = adminUser.id;

	// 🛠 Insertion d'un log de test via logService.
	console.log("🛠 Insertion d'un log de test...");

	const mockRequest = {
		ip: "127.0.0.1",
		headers: {},
		get: () => undefined,
		header: () => undefined,
		accepts: () => undefined,
		acceptsCharsets: () => undefined,
		acceptsEncodings: () => undefined,
		acceptsLanguages: () => undefined,
	} as unknown as Request;

	const testLog = await logService.createLog(
		adminId,
		"LOGIN",
		"Création d'un log de test.",
		mockRequest
	) as unknown as { id: number };

	if (!testLog || !testLog.id) {
		throw new Error("🚨 Impossible d'insérer un log de test.");
	}
	testLogId = testLog.id;
	console.log("✅ Log de test inséré avec ID:", testLogId);
});

describe("📜 API des logs.", () => {
	test("✅ GET /api/logs - Retourne tous les logs (administrateur requis).", async () => {
		const response = await request(testApp)
			.get("/api/logs")
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("✅ GET /api/logs/:id - Retourne un log spécifique (administrateur requis).", async () => {
		const response = await request(testApp)
			.get(`/api/logs/${testLogId}`)
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", testLogId);
	});

	test("✅ GET /api/logs/search - Retourne les logs filtrés par action (administrateur requis).", async () => {
		const response = await request(testApp)
			.get("/api/logs/search?action=LOGIN")
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("✅ GET /api/logs/search - Retourne les logs filtrés par user_id (administrateur requis).", async () => {
		const response = await request(testApp)
			.get(`/api/logs/search?user_id=${adminId}`)
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("❌ GET /api/logs - Retourne 401 si aucun token n'est fourni.", async () => {
		const response = await request(testApp).get("/api/logs");
		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("error");
	});

	test("❌ GET /api/logs/:id - Retourne 404 si le log n'existe pas.", async () => {
		const response = await request(testApp)
			.get("/api/logs/9999") // ID inexistant
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error", "Log introuvable.");
	});
});
