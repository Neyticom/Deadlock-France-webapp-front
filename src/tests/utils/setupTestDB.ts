import database from "../../models";
import cryptoService from "../../services/cryptoService";

/**
 * 🛠️ Configuration de la base de données de test.
 * Synchronise la base et insère les données initiales avant l'exécution des tests.
 */

jest.setTimeout(30000);

beforeAll(async () => {
	process.env.NODE_ENV = "test";

	try {
		console.log("🔄 Synchronisation de la base de données de test...");
		await database.sequelize.sync({ force: true });
		console.log("✅ Base de données de test synchronisée avec succès.");

		// 🔐 Hash des mots de passe
		const hashedPassword1 = await cryptoService.hashPassword("password_hash_1");
		const hashedPassword2 = await cryptoService.hashPassword("password_hash_3");

		// 👥 Création des utilisateurs de test
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

		// 🎭 Création des rôles
		const roles = (await database.Role.bulkCreate(
			[
				{ name: "Admin", weight: 100 },
				{ name: "User", weight: 10 },
			],
			{ returning: true },
		)) as unknown as Array<{ id: number }>;

		// 🔗 Association des rôles aux utilisateurs
		await database.UserHasRole.bulkCreate([
			{ user_id: users[0].id, role_id: roles[0].id },
			{ user_id: users[1].id, role_id: roles[1].id },
		]);

		console.log("✅ Données de test insérées avec succès.");
	} catch (error) {
		console.error(
			"❌ Erreur lors de la configuration de la base de test:",
			error,
		);
		throw error;
	}
});

/**
 * 🔽 Fermeture de la connexion après les tests.
 */
afterAll(async () => {
	await database.sequelize.close();
	console.log("🔌 Connexion à la base de données de test fermée.");
});
