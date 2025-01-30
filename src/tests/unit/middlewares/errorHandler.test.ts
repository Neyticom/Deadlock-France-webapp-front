import request from "supertest";
import express from "express";
import errorHandler from "../../../middlewares/errorHandler";

const app = express();
app.use(express.json());

// Fake route pour générer une erreur serveur (500)
app.get("/server-error", (req, res, next) => {
	next(new Error("Erreur simulée"));
});

// Ajout du middleware d'erreur
app.use(errorHandler);

describe("⚠️ errorHandler Tests (Gestion des erreurs 500 uniquement)", () => {
	it("✅ Devrait capturer une erreur serveur et renvoyer 500", async () => {
		const res = await request(app).get("/server-error");

		expect(res.status).toBe(500);
		expect(res.body.error).toBe("Internal Server Error");
	});
});
