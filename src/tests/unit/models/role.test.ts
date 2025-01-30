import Role from "../../../models/Role";
import sequelize from "../../../config/database";

describe("Role Model", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a role with valid data", async () => {
		const role = await Role.create({
			name: "Moderator",
			weight: 50,
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedRole = role as any;

		expect(typedRole.id).toBeDefined();
		expect(typedRole.name).toBe("Moderator");
		expect(typedRole.weight).toBe(50);
	});

	it("should not allow a role with a null name", async () => {
		await expect(
			Role.create({
				name: null, // 🔴 Doit échouer car `allowNull: false`
				weight: 30,
			}),
		).rejects.toThrow(/notNull Violation: Role.name cannot be null/);
	});

	it("should enforce unique constraints on name", async () => {
		await Role.create({
			name: "Admin",
			weight: 100,
		});

		await expect(
			Role.create({
				name: "Admin", // 🔴 Doit échouer (nom unique)
				weight: 101,
			}),
		).rejects.toThrow();
	});

	it("should enforce unique constraints on weight", async () => {
		await Role.create({
			name: "User",
			weight: 10,
		});

		await expect(
			Role.create({
				name: "Guest",
				weight: 10, // 🔴 Doit échouer (weight unique)
			}),
		).rejects.toThrow();
	});

	it("should not allow a role with a null weight", async () => {
		await expect(
			Role.create({
				name: "Tester",
				weight: null, // 🔴 Doit échouer car `allowNull: false`
			}),
		).rejects.toThrow(/notNull Violation: Role.weight cannot be null/);
	});
});
