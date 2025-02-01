import express from "express";
import router from "../../routes/router";

/**
 * 🏗️ Application Express de test.
 * Utilisée pour les tests d'intégration avec Supertest.
 */
const testApp = express();

testApp.use(express.json());
testApp.use("/api", router);

export default testApp;
