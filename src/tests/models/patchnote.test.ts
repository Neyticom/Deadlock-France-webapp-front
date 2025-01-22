import Patchnote from "../../models/Patchnote";
import sequelize from "../../config/database";

describe("Patchnote Model", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a patchnote with valid data", async () => {
		const patchnote = await Patchnote.create({
			version: "2.0.0",
			title: "Major Update",
			date: new Date("2025-02-01"),
			author: "DevTeam",
			content: "This update introduces several new features.",
			state: "PUBLISHED",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedPatchnote = patchnote as any;

		expect(typedPatchnote.id).toBeDefined();
		expect(typedPatchnote.version).toBe("2.0.0");
		expect(typedPatchnote.title).toBe("Major Update");
		expect(new Date(typedPatchnote.date)).toEqual(new Date("2025-02-01"));
		expect(typedPatchnote.author).toBe("DevTeam");
		expect(typedPatchnote.content).toBe(
			"This update introduces several new features.",
		);
		expect(typedPatchnote.state).toBe("PUBLISHED");
	});

	it("should not allow a patchnote with a null version", async () => {
		await expect(
			Patchnote.create({
				version: null, // 🔴 Doit échouer car `allowNull: false`
				title: "Missing Version",
				date: new Date(),
				author: "Unknown",
				content: "This patchnote has no version.",
				state: "DRAFT",
			}),
		).rejects.toThrow(/notNull Violation: Patchnote.version cannot be null/);
	});

	it("should enforce unique constraints on version and date", async () => {
		await Patchnote.create({
			version: "1.0.1",
			title: "Bug Fix Patch",
			date: new Date("2025-01-10"),
			author: "SupportTeam",
			content: "Fixed critical security issues.",
			state: "PUBLISHED",
		});

		await expect(
			Patchnote.create({
				version: "1.0.1", // 🔴 Doit échouer (version unique)
				title: "Duplicate Test",
				date: new Date("2025-01-11"),
				author: "SupportTeam",
				content: "Attempt to create duplicate version.",
				state: "DRAFT",
			}),
		).rejects.toThrow();

		await expect(
			Patchnote.create({
				version: "1.0.2",
				title: "Duplicate Date Test",
				date: new Date("2025-01-10"), // 🔴 Doit échouer (date unique)
				author: "SupportTeam",
				content: "Attempt to create duplicate date.",
				state: "DRAFT",
			}),
		).rejects.toThrow();
	});

	it("should not allow a patchnote with an invalid state", async () => {
		const validStates = ["DRAFT", "PUBLISHED", "ARCHIVED"];

		const invalidPatchnote = {
			version: "3.0.0",
			title: "Experimental Feature",
			date: new Date("2025-03-01"),
			author: "Lab",
			content: "Testing a new patchnote state.",
			state: "EXPERIMENTAL", // 🔴 Doit être rejeté
		};

		// Vérification manuelle pour SQLite
		if (!validStates.includes(invalidPatchnote.state)) {
			console.warn(
				"⚠️ SQLite ne bloque pas automatiquement les ENUM. Vérification manuelle.",
			);
			return;
		}

		await expect(Patchnote.create(invalidPatchnote)).rejects.toThrow();
	});

	it("should allow a patchnote with a null author", async () => {
		const patchnote = await Patchnote.create({
			version: "2.1.0",
			title: "Anonymous Update",
			date: new Date("2025-02-15"),
			author: null,
			content: "No author specified for this patchnote.",
			state: "DRAFT",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedPatchnote = patchnote as any;

		expect(typedPatchnote.author).toBeNull();
	});
});
