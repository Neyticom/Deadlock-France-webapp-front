import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à SQLite in-memory
import database from "../../models";
import logService from "../../services/logService";
import type { Request } from "express";

let adminToken: string | null = null;
let adminId: number | null = null;
let testLogId: number | null = null;

beforeAll(async () => {
	console.log("🔄 Tentative de connexion en tant qu'admin...");

	// 🔄 Connexion pour récupérer le token d'admin
	const response = await request(testApp)
		.post("/api/auth/login")
		.send({ login: "admin", password: "password_hash_1" });

	if (response.status === 200) {
		adminToken = response.body.token;
		console.log("✅ Token admin récupéré:", adminToken);
	} else {
		console.error("❌ Échec de connexion admin:", response.body);
		throw new Error("🚨 Impossible d'obtenir le token d'admin");
	}

	// 🔄 Récupération de l'ID de l'admin
	const adminUser = await database.User.findOne({ where: { login: "admin" } }) as unknown as { id: number };
	if (!adminUser) {
		throw new Error("🚨 Impossible de récupérer l'utilisateur admin en base");
	}
	adminId = adminUser.id;

	// 🛠 Insertion d'un log de test via logService
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
		"Test log creation",
		mockRequest
	) as unknown as { id: number };

	if (!testLog || !testLog.id) {
		throw new Error("🚨 Impossible d'insérer un log de test");
	}
	testLogId = testLog.id;
	console.log("✅ Log de test inséré avec ID:", testLogId);
});

describe("Log API", () => {
	test("GET /api/logs - should return all logs (admin required)", async () => {
		const response = await request(testApp)
			.get("/api/logs")
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("GET /api/logs/:id - should return a specific log (admin required)", async () => {
		const response = await request(testApp)
			.get(`/api/logs/${testLogId}`)
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", testLogId);
	});

	test("GET /api/logs/search - should return logs filtered by action (admin required)", async () => {
		const response = await request(testApp)
			.get("/api/logs/search?action=LOGIN")
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("GET /api/logs/search - should return logs filtered by user_id (admin required)", async () => {
		const response = await request(testApp)
			.get(`/api/logs/search?user_id=${adminId}`)
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	test("GET /api/logs - should return 401 if no token is provided", async () => {
		const response = await request(testApp).get("/api/logs");
		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("error");
	});

	test("GET /api/logs/:id - should return 404 if log does not exist", async () => {
		const response = await request(testApp)
			.get("/api/logs/9999") // ID inexistant
			.set("Authorization", `Bearer ${adminToken}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error", "Log non trouvé");
	});
});
