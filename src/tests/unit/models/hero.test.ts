import Hero from "../../../models/Hero";
import sequelize from "../../../config/database";

describe("Modèle Hero", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("Devrait créer un héros avec des données valides", async () => {
		const hero = await Hero.create({
			name: "Superman",
			resume: "A powerful superhero",
			description: "Superman has super strength and flight abilities.",
			img_path: "/images/superman.jpg",
			video_path: "/videos/superman.mp4",
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedHero = hero as any;

		expect(typedHero.id).toBeDefined();
		expect(typedHero.name).toBe("Superman");
		expect(typedHero.resume).toBe("A powerful superhero");
		expect(typedHero.description).toBe(
			"Superman has super strength and flight abilities.",
		);
		expect(typedHero.img_path).toBe("/images/superman.jpg");
		expect(typedHero.video_path).toBe("/videos/superman.mp4");
	});

	it("Devrait refuser la création d'un héros sans nom", async () => {
		await expect(
			Hero.create({
				name: null, // 🔴 Doit échouer car `allowNull: false`
				resume: "A superhero with no name",
				description: "A nameless superhero story.",
				img_path: "/images/nameless.jpg",
				video_path: "/videos/nameless.mp4",
			}),
		).rejects.toThrow();
	});

	it("Devrait appliquer les contraintes d'unicité sur name, img_path et video_path", async () => {
		await Hero.create({
			name: "Batman",
			resume: "Dark Knight",
			description: "Batman is a vigilante in Gotham.",
			img_path: "/images/batman.jpg",
			video_path: "/videos/batman.mp4",
		});

		await expect(
			Hero.create({
				name: "Batman", // 🔴 Doit échouer
				resume: "Duplicate name test",
				description: "Should fail because name is not unique",
				img_path: "/images/unique.jpg",
				video_path: "/videos/unique.mp4",
			}),
		).rejects.toThrow();

		await expect(
			Hero.create({
				name: "New Hero",
				resume: "Test image uniqueness",
				description: "Should fail because img_path is not unique",
				img_path: "/images/batman.jpg", // 🔴 Doit échouer
				video_path: "/videos/newhero.mp4",
			}),
		).rejects.toThrow();
	});

	it("Devrait autoriser des valeurs nulles pour img_path et video_path", async () => {
		const hero = await Hero.create({
			name: "Invisible Man",
			resume: "You cannot see him",
			description: "An invisible superhero story.",
			img_path: null,
			video_path: null,
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const typedHero = hero as any;
		expect(typedHero.img_path).toBeNull();
		expect(typedHero.video_path).toBeNull();
	});
});
