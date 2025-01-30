import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB"; // Connexion à la base SQLite in-memory

let authToken: string;
let heroId: number; // ✅ Stocke l'ID du héros de test

beforeAll(async () => {
  console.log("🔄 Tentative de connexion pour récupérer le token...");

  const loginResponse = await request(testApp)
    .post("/api/auth/login")
    .send({ login: "admin", password: "password_hash_1" });

  if (loginResponse.status === 200) {
    authToken = loginResponse.body.token;
    console.log("✅ Token récupéré pour tests:", authToken);
  } else {
    console.error("❌ Login failed during tests:", loginResponse.body);
    throw new Error("🚨 Impossible d'obtenir un token d'authentification");
  }

  console.log("🛠 Insertion d'un héros de test...");

  const createHeroResponse = await request(testApp)
    .post("/api/heroes")
    .set("Authorization", `Bearer ${authToken}`)
    .send({
      name: "TestHero",
      resume: "A short description of the hero.",
      description: "A hero for testing",
      img_path: "https://example.com/images/testhero.png",  // 🟢 URL valide
      video_path: "https://example.com/videos/testhero.mp4", // 🟢 URL valide
    });

  if (createHeroResponse.status === 201) {
    heroId = createHeroResponse.body.id;
    console.log("✅ Héros de test inséré avec ID:", heroId);
  } else {
    console.error("❌ Erreur lors de l'insertion du héros:", createHeroResponse.body);
    throw new Error("🚨 Impossible d'insérer un héros de test");
  }
});

describe("Hero API", () => {
  test("GET /api/heroes - should return all heroes", async () => {
    const response = await request(testApp).get("/api/heroes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/heroes/:id - should return a specific hero", async () => {
    const response = await request(testApp).get(`/api/heroes/${heroId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", heroId);
  });

  test("POST /api/heroes - should create a new hero (auth required)", async () => {
    const response = await request(testApp)
      .post("/api/heroes")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "NewHero",
        resume: "New hero description",
        description: "A new hero with unique abilities",
        img_path: "https://example.com/images/newhero.png",
        video_path: "https://example.com/videos/newhero.mp4",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("NewHero");
  });

  test("PATCH /api/heroes/:id - should update an existing hero (auth required)", async () => {
    const response = await request(testApp)
      .patch(`/api/heroes/${heroId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ description: "Updated hero description" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("description", "Updated hero description");
  });

  test("DELETE /api/heroes/:id - should delete a hero (auth required)", async () => {
    const response = await request(testApp)
      .delete(`/api/heroes/${heroId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });

  test("POST /api/heroes - should return 401 if no token is provided", async () => {
    const response = await request(testApp)
      .post("/api/heroes")
      .send({
        name: "UnauthorizedHero",
        resume: "Should not be created",
        description: "Missing auth token",
        img_path: "https://example.com/images/unauthorizedhero.png",
        video_path: "https://example.com/videos/unauthorizedhero.mp4",
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Accès refusé, token manquant");
  });

  test("DELETE /api/heroes/:id - should return 401 if no token is provided", async () => {
    const response = await request(testApp).delete(`/api/heroes/${heroId}`);
    expect(response.status).toBe(401);
  });

  test("GET /api/heroes/:id - should return 404 if hero does not exist", async () => {
    const response = await request(testApp).get("/api/heroes/9999");
    expect(response.status).toBe(404);
  });
});
