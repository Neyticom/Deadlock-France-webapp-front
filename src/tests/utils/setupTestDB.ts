import database from "../../models";
import cryptoService from "../../services/cryptoService";

jest.setTimeout(30000);

beforeAll(async () => {
	process.env.NODE_ENV = "test";

	try {
		await database.sequelize.sync({ force: true });
		console.log("✅ Test database synchronized successfully");

		const hashedPassword1 = await cryptoService.hashPassword("password_hash_1");
		const hashedPassword2 = await cryptoService.hashPassword("password_hash_3");

		const users = (await database.User.bulkCreate(
			[
				{
					login: "admin",
					password: hashedPassword1,
					firstname: "Admin",
					lastname: "User",
					nickname: "Admin123",
					email: "admin@example.com",
					twoFactor: false,
				},
				{
					login: "johndoe",
					password: hashedPassword2,
					firstname: "John",
					lastname: "Doe",
					nickname: "Johnny",
					email: "john.doe@example.com",
					twoFactor: false,
				},
			],
			{ returning: true },
		)) as unknown as Array<{ id: number }>;

		const roles = (await database.Role.bulkCreate(
			[
				{ name: "Admin", weight: 100 },
				{ name: "User", weight: 10 },
			],
			{ returning: true },
		)) as unknown as Array<{ id: number }>;

		await database.UserHasRole.bulkCreate([
			{ user_id: users[0].id, role_id: roles[0].id },
			{ user_id: users[1].id, role_id: roles[1].id },
		]);

		console.log("✅ Test data inserted successfully");
	} catch (error) {
		console.error("❌ Error while setting up test database:", error);
		throw error;
	}
});

afterAll(async () => {
	await database.sequelize.close();
});
