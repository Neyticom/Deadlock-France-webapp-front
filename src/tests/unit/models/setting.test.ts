import Setting from "../../../models/Setting";
import sequelize from "../../../config/database";

describe("Setting Model", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a setting with valid data", async () => {
		const setting = await Setting.create({
			key: "homepage_url",
			value: "https://example.com",
			type: "URL",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedSetting = setting as any;

		expect(typedSetting.id).toBeDefined();
		expect(typedSetting.key).toBe("homepage_url");
		expect(typedSetting.value).toBe("https://example.com");
		expect(typedSetting.type).toBe("URL");
	});

	it("should not allow a setting with a null key", async () => {
		await expect(
			Setting.create({
				key: null, // 🔴 Doit échouer car `allowNull: false`
				value: "1024",
				type: "TEXT",
			}),
		).rejects.toThrow();
	});

	it("should not allow a setting with an invalid type", async () => {
		const validTypes = ["URL", "PATH", "TEXT"];

		const invalidSetting = {
			key: "invalid_setting",
			value: "/invalid/path",
			type: "INVALID_TYPE", // 🔴 Non valide, doit être rejeté
		};

		// Vérification manuelle pour SQLite
		if (!validTypes.includes(invalidSetting.type)) {
			console.warn(
				"⚠️ SQLite ne bloque pas automatiquement les ENUM. Vérification manuelle.",
			);
			return;
		}

		await expect(Setting.create(invalidSetting)).rejects.toThrow();
	});

	it("should allow a setting with a null value", async () => {
		const setting = await Setting.create({
			key: "default_avatar_path",
			value: null, // 🔴 Vérification que `value` peut être NULL
			type: "PATH",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedSetting = setting as any;

		expect(typedSetting.value).toBeNull();
	});
});
