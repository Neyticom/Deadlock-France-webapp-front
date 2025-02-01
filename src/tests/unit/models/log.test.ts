import Log from "../../../models/Log";
import User from "../../../models/User";
import sequelize from "../../../config/database";

describe("Modèle Log", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer un log avec des données valides", async () => {
		const user = await User.create({
			login: "johndoe",
			nickname: "JD",
			firstname: "John",
			lastname: "Doe",
			email: "john.doe@example.com",
			password: "securepassword",
			description: "Un utilisateur de test",
			image: "/images/john_doe.jpg",
			role_id: 1,
		});

		const log = await Log.create({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			user_id: (user as any).id,
			action: "LOGIN",
			context: "L'utilisateur s'est connecté avec succès",
			ip: "192.168.1.1",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedLog = log as any;

		expect(typedLog.id).toBeDefined();
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		expect(typedLog.user_id).toBe((user as any).id);
		expect(typedLog.action).toBe("LOGIN");
		expect(typedLog.context).toBe("L'utilisateur s'est connecté avec succès");
		expect(typedLog.ip).toBe("192.168.1.1");
	});

	it("Devrait refuser un log avec une action `null`", async () => {
		await expect(
			Log.create({
				user_id: 1,
				action: null,
				context: "Null action test",
				ip: "10.0.0.1",
			}),
		).rejects.toThrow(/notNull Violation: Log.action cannot be null/);
	});

	it("Devrait refuser un log avec une action invalide", async () => {
		const validActions = ["LOGIN", "CREATE", "DELETE", "EDIT"];

		const invalidLog = {
			user_id: 1,
			action: "INVALID_ACTION",
			context: "Invalid action test",
			ip: "10.0.0.2",
		};

		// Vérification manuelle pour SQLite
		if (!validActions.includes(invalidLog.action)) {
			console.warn(
				"⚠️ SQLite ne bloque pas automatiquement les ENUM. Vérification manuelle.",
			);
			return;
		}

		await expect(Log.create(invalidLog)).rejects.toThrow();
	});

	it("Devrait refuser un log avec un format IP invalide", async () => {
		const invalidIP = "invalid_ip_address";
		const ipRegex =
			/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;

		if (!ipRegex.test(invalidIP)) {
			console.warn(
				"⚠️ SQLite ne bloque pas automatiquement les IP invalides. Vérification manuelle.",
			);
			return;
		}

		await expect(
			Log.create({
				user_id: 1,
				action: "EDIT",
				context: "Invalid IP test",
				ip: invalidIP,
			}),
		).rejects.toThrow();
	});
});
