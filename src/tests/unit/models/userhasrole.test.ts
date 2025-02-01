import UserHasRole from "../../../models/UserHasRole";
import User from "../../../models/User";
import Role from "../../../models/Role";
import sequelize from "../../../config/database";

describe("Modèle UserHasRole", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests

		// Création d'un utilisateur et d'un rôle pour tester les relations
		await Role.create({ name: "Admin", weight: 100 });
		await Role.create({ name: "User", weight: 10 });

		await User.create({
			login: "testuser",
			password: "securepassword",
			firstname: "Test",
			lastname: "User",
			nickname: "Tester",
			email: "testuser@example.com",
			twoFactor: false,
		});
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer une association user-role avec des données valides", async () => {
		const user = await User.findOne({ where: { login: "testuser" } });
		const role = await Role.findOne({ where: { name: "Admin" } });

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedUser = user as any;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedRole = role as any;

		const userHasRole = await UserHasRole.create({
			user_id: typedUser.id,
			role_id: typedRole.id,
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedUserHasRole = userHasRole as any;

		expect(typedUserHasRole.id).toBeDefined();
		expect(typedUserHasRole.user_id).toBe(typedUser.id);
		expect(typedUserHasRole.role_id).toBe(typedRole.id);
	});

	it("Devrait refuser une association user-role sans user_id", async () => {
		await expect(
			UserHasRole.create({
				user_id: null, // 🔴 Doit échouer car `allowNull: false`
				role_id: 1,
			}),
		).rejects.toThrow(/notNull Violation: UserHasRole.user_id cannot be null/);
	});

	it("Devrait refuser une association user-role sans role_id", async () => {
		await expect(
			UserHasRole.create({
				user_id: 1,
				role_id: null, // 🔴 Doit échouer car `allowNull: false`
			}),
		).rejects.toThrow(/notNull Violation: UserHasRole.role_id cannot be null/);
	});

	it("Devrait refuser une association user-role avec un user_id inexistant", async () => {
		await expect(
			UserHasRole.create({
				user_id: 999, // 🔴 ID inexistant
				role_id: 1,
			}),
		).rejects.toThrow();
	});

	it("Devrait refuser une association user-role avec un role_id inexistant", async () => {
		await expect(
			UserHasRole.create({
				user_id: 1,
				role_id: 999, // 🔴 ID inexistant
			}),
		).rejects.toThrow();
	});
});
