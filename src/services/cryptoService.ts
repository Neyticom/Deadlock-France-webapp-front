/**
 * Service de cryptographie.
 * Gère le hachage et la comparaison des mots de passe.
 */

import bcrypt from "bcrypt";

const cryptoService = {
	/**
	 * Hache un mot de passe en utilisant bcrypt.
	 * @param plainPassword - Mot de passe en clair.
	 * @returns Mot de passe haché.
	 */
	hashPassword: async (plainPassword: string): Promise<string> => {
		const saltRounds = 10;
		return bcrypt.hash(plainPassword, saltRounds);
	},

	/**
	 * Compare un mot de passe en clair avec un mot de passe haché.
	 * @param plainPassword - Mot de passe en clair.
	 * @param hashedPassword - Mot de passe haché stocké.
	 * @returns `true` si les mots de passe correspondent, sinon `false`.
	 */
	comparePassword: async (
		plainPassword: string,
		hashedPassword: string,
	): Promise<boolean> => {
		return bcrypt.compare(plainPassword, hashedPassword);
	},
};

export default cryptoService;
