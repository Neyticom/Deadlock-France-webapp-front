import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../../../middlewares/authMiddleware";

const app = express();
app.use(express.json());

// Fake route pour tester le middleware
app.get("/protected", authMiddleware.verifyToken, (req, res) => {
	res.status(200).json({ message: "Accès autorisé." });
});

app.get("/admin", authMiddleware.verifyAdmin, (req, res) => {
	res.status(200).json({ message: "Accès administrateur autorisé." });
});

describe("🔐 Tests du middleware d'authentification.", () => {
	let validToken: string;
	let invalidToken: string;

	beforeAll(() => {
		validToken = jwt.sign(
			{ id: 1, login: "testuser", role: "User" },
			process.env.JWT_SECRET as string,
			{ expiresIn: "1h" },
		);
		invalidToken = "invalid.token.example";
	});

	it("✅ Devrait autoriser un utilisateur avec un token valide.", async () => {
		const res = await request(app)
			.get("/protected")
			.set("Authorization", `Bearer ${validToken}`);

		expect(res.status).toBe(200);
		expect(res.body.message).toBe("Accès autorisé.");
	});

	it("❌ Devrait refuser l'accès sans token.", async () => {
		const res = await request(app).get("/protected");

		expect(res.status).toBe(401);
		expect(res.body.error).toBe("Accès refusé, token manquant.");
	});

	it("❌ Devrait refuser l'accès avec un token invalide.", async () => {
		const res = await request(app)
			.get("/protected")
			.set("Authorization", `Bearer ${invalidToken}`);

		expect(res.status).toBe(401);
		expect(res.body.error).toBe("Token invalide ou expiré.");
	});

	it("❌ Devrait refuser l'accès administrateur avec un token utilisateur.", async () => {
		const res = await request(app)
			.get("/admin")
			.set("Authorization", `Bearer ${validToken}`); // Utilisateur normal

		expect(res.status).toBe(403);
		expect(res.body.error).toBe("Accès refusé, privilèges insuffisants.");
	});
});
