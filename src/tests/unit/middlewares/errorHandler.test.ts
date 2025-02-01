import request from "supertest";
import express from "express";
import errorHandler from "../../../middlewares/errorHandler";

const app = express();
app.use(express.json());

// Fake route pour générer une erreur serveur (500)
app.get("/server-error", (req, res, next) => {
	next(new Error("Erreur simulée"));
});

// Ajout du middleware de gestion des erreurs.
app.use(errorHandler);

describe("⚠️ Tests du middleware de gestion des erreurs globales.", () => {
	it("✅ Devrait capturer une erreur serveur et renvoyer un statut 500.", async () => {
		const res = await request(app).get("/server-error");

		expect(res.status).toBe(500);
		expect(res.body.error).toBe("Internal Server Error");
	});
});
