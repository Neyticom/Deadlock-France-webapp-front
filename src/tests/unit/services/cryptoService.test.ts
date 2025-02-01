import cryptoService from "../../../services/cryptoService";

// Service de chiffrement (cryptoService)
// Vérifie la bonne gestion du hachage et de la comparaison des mots de passe.
describe("🔐 Tests du service de chiffrement", () => {
	const plainPassword = "SuperSecure123!";
	let hashedPassword: string;

	it("✅ Devrait hacher un mot de passe correctement.", async () => {
		hashedPassword = await cryptoService.hashPassword(plainPassword);
		expect(hashedPassword).toBeDefined();
		expect(hashedPassword).not.toBe(plainPassword); // Vérifie que le hash est différent.  
	});

	it("✅ Devrait valider un mot de passe correct.", async () => {
		const isValid = await cryptoService.comparePassword(
			plainPassword,
			hashedPassword,
		);
		expect(isValid).toBe(true);
	});

	it("❌ Devrait rejeter un mot de passe incorrect.", async () => {
		const isValid = await cryptoService.comparePassword(
			"WrongPassword123!",
			hashedPassword,
		);
		expect(isValid).toBe(false);
	});
});
