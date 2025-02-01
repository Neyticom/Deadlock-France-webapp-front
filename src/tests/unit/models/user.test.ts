import User from "../../../models/User";
import sequelize from "../../../config/database";

describe("Modèle User", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer un utilisateur avec des données valides", async () => {
		const user = await User.create({
			login: "johndoe",
			password: "securepassword123",
			firstname: "John",
			lastname: "Doe",
			nickname: "Johnny",
			email: "johndoe@example.com",
			twoFactor: true,
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedUser = user as any;

		expect(typedUser.id).toBeDefined();
		expect(typedUser.login).toBe("johndoe");
		expect(typedUser.password).toBe("securepassword123");
		expect(typedUser.firstname).toBe("John");
		expect(typedUser.lastname).toBe("Doe");
		expect(typedUser.nickname).toBe("Johnny");
		expect(typedUser.email).toBe("johndoe@example.com");
		expect(typedUser.twoFactor).toBe(true);
	});

	it("Devrait refuser un utilisateur sans login", async () => {
		await expect(
			User.create({
				login: null, // 🔴 Doit échouer car `allowNull: false`
				password: "pass123",
				firstname: "Jane",
				lastname: "Doe",
				nickname: "Janey",
				email: "janedoe@example.com",
				twoFactor: false,
			}),
		).rejects.toThrow(/notNull Violation: User.login cannot be null/);
	});

	it("Devrait appliquer une contrainte d'unicité sur le login", async () => {
		await User.create({
			login: "uniqueuser",
			password: "securepass456",
			firstname: "Unique",
			lastname: "User",
			nickname: "UUser",
			email: "unique@example.com",
			twoFactor: false,
		});

		await expect(
			User.create({
				login: "uniqueuser", // 🔴 Doit échouer (login unique)
				password: "diffpass789",
				firstname: "Duplicate",
				lastname: "User",
				nickname: "DuplicateUser",
				email: "duplicate@example.com",
				twoFactor: false,
			}),
		).rejects.toThrow();
	});

	it("Devrait appliquer une contrainte d'unicité sur l'email", async () => {
		await User.create({
			login: "emailuser",
			password: "securepass999",
			firstname: "Email",
			lastname: "User",
			nickname: "EmailGuy",
			email: "emailunique@example.com",
			twoFactor: false,
		});

		await expect(
			User.create({
				login: "emailduplicate",
				password: "securepass000",
				firstname: "Duplicate",
				lastname: "Email",
				nickname: "DupEmail",
				email: "emailunique@example.com", // 🔴 Doit échouer (email unique)
				twoFactor: false,
			}),
		).rejects.toThrow();
	});

	it("Devrait appliquer une contrainte d'unicité sur le surnom (nickname)", async () => {
		await User.create({
			login: "nickuser",
			password: "nickpass123",
			firstname: "Nick",
			lastname: "User",
			nickname: "UniqueNick",
			email: "nickunique@example.com",
			twoFactor: false,
		});

		await expect(
			User.create({
				login: "nickduplicate",
				password: "nickpass456",
				firstname: "Duplicate",
				lastname: "Nick",
				nickname: "UniqueNick", // 🔴 Doit échouer (nickname unique)
				email: "nickdiff@example.com",
				twoFactor: false,
			}),
		).rejects.toThrow();
	});

	it("Devrait appliquer une contrainte d'unicité sur le mot de passe", async () => {
		await User.create({
			login: "passuser",
			password: "uniquepassword",
			firstname: "Pass",
			lastname: "User",
			nickname: "PassGuy",
			email: "passunique@example.com",
			twoFactor: false,
		});

		await expect(
			User.create({
				login: "passduplicate",
				password: "uniquepassword", // 🔴 Doit échouer (password unique)
				firstname: "Duplicate",
				lastname: "Pass",
				nickname: "DupPass",
				email: "passdiff@example.com",
				twoFactor: false,
			}),
		).rejects.toThrow();
	});

	it("Devrait définir twoFactor sur false par défaut si non fourni", async () => {
		const user = await User.create({
			login: "default2fa",
			password: "defaultpass",
			firstname: "Default",
			lastname: "TwoFactor",
			nickname: "D2F",
			email: "default2fa@example.com",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedUser = user as any;
		expect(typedUser.twoFactor).toBe(false);
	});
});
