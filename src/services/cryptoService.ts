import bcrypt from "bcrypt";

const cryptoService = {
	hashPassword: async (plainPassword: string): Promise<string> => {
		const saltRounds = 10;
		return bcrypt.hash(plainPassword, saltRounds);
	},

	comparePassword: async (
		plainPassword: string,
		hashedPassword: string,
	): Promise<boolean> => {
		return bcrypt.compare(plainPassword, hashedPassword);
	},
};

export default cryptoService;