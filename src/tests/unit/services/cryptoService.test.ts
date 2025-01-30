import cryptoService from "../../../services/cryptoService";

describe("Crypto Service", () => {
	const plainPassword = "SuperSecure123!";
	let hashedPassword: string;

	it("should hash a password correctly", async () => {
		hashedPassword = await cryptoService.hashPassword(plainPassword);
		expect(hashedPassword).toBeDefined();
		expect(hashedPassword).not.toBe(plainPassword); // Vérifie que le hash est différent
	});

	it("should validate a correct password", async () => {
		const isValid = await cryptoService.comparePassword(
			plainPassword,
			hashedPassword,
		);
		expect(isValid).toBe(true);
	});

	it("should reject an incorrect password", async () => {
		const isValid = await cryptoService.comparePassword(
			"WrongPassword123!",
			hashedPassword,
		);
		expect(isValid).toBe(false);
	});
});
