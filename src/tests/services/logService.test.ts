import logService from "../../services/logService";
import Log from "../../models/Log";

jest.mock("../../models/Log", () => ({
	create: jest.fn(),
}));

describe("Log Service", () => {
    // Désactiver console.error pour les tests
	beforeAll(() => {
		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	// Avant chaque test, réinitialiser les mocks pour éviter les interférences
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should create a log using x-forwarded-for IP if available", async () => {
		const mockRequest = {
			headers: { "x-forwarded-for": "203.0.113.42" },
			ip: undefined, // Simule une requête sans `req.ip`
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any;

		await logService.createLog(1, "LOGIN", "User logged in", mockRequest);

		expect(Log.create).toHaveBeenCalledWith({
			user_id: 1,
			action: "LOGIN",
			context: "User logged in",
			ip: "203.0.113.42", // x-forwarded-for est utilisé
		});
	});

	it("should fallback to req.ip if x-forwarded-for is missing", async () => {
		const mockRequestNoXForwardedFor = {
			headers: {}, // Aucune IP dans les headers
			ip: "192.168.1.1", // Simule une requête avec uniquement `req.ip`
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any;

		await logService.createLog(
			null,
			"CREATE",
			"Anonymous action",
			mockRequestNoXForwardedFor,
		);

		expect(Log.create).toHaveBeenCalledWith({
			user_id: null,
			action: "CREATE",
			context: "Anonymous action",
			ip: "192.168.1.1", // req.ip est utilisé
		});
	});

	it("should default to UNKNOWN if no IP is available", async () => {
		const mockRequestNoIp = {
			headers: {}, // Pas de x-forwarded-for
			ip: undefined, // Pas de req.ip non plus
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any;

		await logService.createLog(
			2,
			"EDIT",
			"Updated user profile",
			mockRequestNoIp,
		);

		expect(Log.create).toHaveBeenCalledWith({
			user_id: 2,
			action: "EDIT",
			context: "Updated user profile",
			ip: "UNKNOWN", // Aucun IP détecté, fallback sur UNKNOWN
		});
	});

	it("should handle logging errors", async () => {
		(Log.create as jest.Mock).mockRejectedValue(new Error("DB error"));

		await expect(
			logService.createLog(1, "DELETE", "Something went wrong", {
				headers: {},
				ip: "192.168.1.1",
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			} as any),
		).rejects.toThrow("DB error");

		// Vérifie que `Log.create` a bien été appelé malgré l'erreur
		expect(Log.create).toHaveBeenCalledTimes(1);
	});
});
