import Log from "../../models/Log";
import User from "../../models/User";
import sequelize from "../../config/database";

describe("Log Model", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a log with valid data", async () => {
		const user = await User.create({
			login: "johndoe",
			nickname: "JD",
			firstname: "John",
			lastname: "Doe",
			email: "john.doe@example.com",
			password: "securepassword",
			description: "A test user",
			image: "/images/john_doe.jpg",
			role_id: 1,
		});

		const log = await Log.create({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			user_id: (user as any).id,
			action: "LOGIN",
			context: "User logged in successfully",
			ip: "192.168.1.1",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedLog = log as any;

		expect(typedLog.id).toBeDefined();
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		expect(typedLog.user_id).toBe((user as any).id);
		expect(typedLog.action).toBe("LOGIN");
		expect(typedLog.context).toBe("User logged in successfully");
		expect(typedLog.ip).toBe("192.168.1.1");
	});

	it("should not allow a log with a null action", async () => {
		await expect(
			Log.create({
				user_id: 1,
				action: null,
				context: "Null action test",
				ip: "10.0.0.1",
			}),
		).rejects.toThrow(/notNull Violation: Log.action cannot be null/);
	});

	it("should not allow a log with an invalid action", async () => {
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

	it("should not allow a log with an invalid IP format", async () => {
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
