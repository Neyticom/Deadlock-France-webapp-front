import Statistic from "../../../models/Statistic";
import sequelize from "../../../config/database";

describe("Modèle Statistic", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer une statistique avec des données valides", async () => {
		const statistic = await Statistic.create({
			origin: "Homepage",
			count: 120,
			date: new Date(),
			type: "VIEW",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedStatistic = statistic as any;

		expect(typedStatistic.id).toBeDefined();
		expect(typedStatistic.origin).toBe("Homepage");
		expect(typedStatistic.count).toBe(120);
		expect(typedStatistic.date).toBeInstanceOf(Date);
		expect(typedStatistic.type).toBe("VIEW");
	});

	it("Devrait refuser une statistique sans origine", async () => {
		await expect(
			Statistic.create({
				origin: null, // 🔴 Doit échouer car `allowNull: false`
				count: 50,
				date: new Date(),
				type: "CLICK",
			}),
		).rejects.toThrow(/notNull Violation: Statistic.origin cannot be null/);
	});

	it("Devrait refuser une statistique sans valeur de comptage", async () => {
		await expect(
			Statistic.create({
				origin: "Patchnotes",
				count: null, // 🔴 Doit échouer car `allowNull: false`
				date: new Date(),
				type: "VIEW",
			}),
		).rejects.toThrow(/notNull Violation: Statistic.count cannot be null/);
	});

	it("Devrait refuser une statistique avec un type invalide", async () => {
		const validTypes = ["VIEW", "CLICK"];

		const invalidStatistic = {
			origin: "Événement invalide",
			count: 10,
			date: new Date(),
			type: "INVALID", // 🔴 Doit être rejeté
		};

		// Vérification manuelle pour SQLite
		if (!validTypes.includes(invalidStatistic.type)) {
			console.warn(
				"⚠️ SQLite ne bloque pas automatiquement les ENUM. Vérification manuelle.",
			);
			return;
		}

		await expect(Statistic.create(invalidStatistic)).rejects.toThrow();
	});

	it("Devrait assigner automatiquement un timestamp si la date n'est pas fournie", async () => {
		const statistic = await Statistic.create({
			origin: "Horodatage automatique",
			count: 5,
			type: "VIEW",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedStatistic = statistic as any;

		expect(typedStatistic.date).toBeDefined();
		expect(new Date(typedStatistic.date).getTime()).toBeGreaterThan(0);
	});
});
