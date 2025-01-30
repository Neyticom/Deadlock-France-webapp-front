import request from "supertest";
import express from "express";
import validationMiddleware from "../../../middlewares/validationMiddleware";
import Joi from "joi";

const app = express();
app.use(express.json());

// Définition d'un schéma de validation Joi
const testSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().integer().min(18).max(99).required(),
});

// Fake route qui utilise le middleware de validation
app.post("/validate", validationMiddleware(testSchema), (req, res) => {
    res.status(200).json({ message: "Validation réussie" });
});

describe("✅ validationMiddleware Tests", () => {
    it("✅ Devrait accepter une requête valide", async () => {
        const res = await request(app)
            .post("/validate")
            .send({ name: "Alice", age: 25 });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Validation réussie");
    });

    it("❌ Devrait refuser une requête avec un champ manquant", async () => {
        const res = await request(app)
            .post("/validate")
            .send({ name: "Alice" }); // Manque l'âge

        expect(res.status).toBe(400);
        expect(res.body.errors.length).toBeGreaterThan(0);
    });

    it("❌ Devrait refuser une requête avec des valeurs invalides", async () => {
        const res = await request(app)
            .post("/validate")
            .send({ name: "A", age: 120 }); // Nom trop court, âge trop élevé

        expect(res.status).toBe(400);
        expect(res.body.errors.length).toBeGreaterThan(0);
    });
});
