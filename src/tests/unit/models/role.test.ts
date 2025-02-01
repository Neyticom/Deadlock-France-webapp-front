import Role from "../../../models/Role";
import sequelize from "../../../config/database";

describe("Modèle Role", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer un rôle avec des données valides", async () => {
		const role = await Role.create({
			name: "Modérateur",
			weight: 50,
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedRole = role as any;

		expect(typedRole.id).toBeDefined();
		expect(typedRole.name).toBe("Modérateur");
		expect(typedRole.weight).toBe(50);
	});

	it("Devrait refuser un rôle sans nom", async () => {
		await expect(
			Role.create({
				name: null, // 🔴 Doit échouer car `allowNull: false`
				weight: 30,
			}),
		).rejects.toThrow(/notNull Violation: Role.name cannot be null/);
	});

	it("Devrait appliquer la contrainte d'unicité sur le nom", async () => {
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

	it("Devrait appliquer la contrainte d'unicité sur le champ `weight`", async () => {
		await Role.create({
			name: "User",
			weight: 10,
		});

		await expect(
			Role.create({
				name: "Invité",
				weight: 10, // 🔴 Doit échouer (weight unique)
			}),
		).rejects.toThrow();
	});

	it("Devrait refuser un rôle avec le champ `weight` null", async () => {
		await expect(
			Role.create({
				name: "Testeur",
				weight: null, // 🔴 Doit échouer car `allowNull: false`
			}),
		).rejects.toThrow(/notNull Violation: Role.weight cannot be null/);
	});
});
