import request from "supertest";
import testApp from "../utils/setupTestServer";
import "../utils/setupTestDB";

let authToken: string | null = null;
let itemId: number | null = null;

beforeAll(async () => {
  console.log("🔄 Tentative de connexion pour récupérer le token...");

  const response = await request(testApp)
    .post("/api/auth/login")
    .send({ login: "admin", password: "password_hash_1" });

  if (response.status === 200) {
    authToken = response.body.token;
    console.log("✅ Token récupéré pour tests:", authToken);
  } else {
    console.error("❌ Login failed during tests:", response.body);
    throw new Error("🚨 Impossible d'obtenir un token d'authentification");
  }

  console.log("🛠 Insertion d'un item de test...");
  const createItemResponse = await request(testApp)
    .post("/api/items")
    .set("Authorization", `Bearer ${authToken}`)
    .send({
      name: "Excalibur",
      category: "WEAPON",
      cost: 1500,
      common_bonus: 10,
      active_description: "Inflige des dégâts supplémentaires",
      active_duration: 30,
      passive_description: "Augmente la défense",
      passive_duration: 60,
    });

  if (createItemResponse.status === 201) {
    itemId = createItemResponse.body.id;
    console.log("✅ Item de test inséré avec ID:", itemId);
  } else {
    console.error("❌ Erreur lors de l'insertion de l'item:", createItemResponse.body);
    throw new Error("🚨 Impossible d'insérer un item de test");
  }
});

describe("Item API", () => {
  test("GET /api/items - should return all items", async () => {
    const response = await request(testApp).get("/api/items");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /api/items/:id - should return a specific item", async () => {
    const response = await request(testApp).get(`/api/items/${itemId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", itemId);
    expect(response.body.name).toBe("Excalibur");
  });

  test("POST /api/items - should create a new item (auth required)", async () => {
    const response = await request(testApp)
      .post("/api/items")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Mjolnir",
        category: "WEAPON",
        cost: 2000,
        common_bonus: 15,
        active_description: "Lance des éclairs",
        active_duration: 40,
        passive_description: "Augmente l'endurance",
        passive_duration: 70,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Mjolnir");
  });

  test("PATCH /api/items/:id - should update an existing item (auth required)", async () => {
    const response = await request(testApp)
      .patch(`/api/items/${itemId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ cost: 1800 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("cost", 1800);
  });

  test("DELETE /api/items/:id - should delete an item (auth required)", async () => {
    const response = await request(testApp)
      .delete(`/api/items/${itemId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Item deleted");
  });

  test("POST /api/items - should return 401 if no token is provided", async () => {
    const response = await request(testApp)
      .post("/api/items")
      .send({
        name: "Forbidden Sword",
        category: "WEAPON",
        cost: 2500,
        common_bonus: 20,
        active_description: "Inflige un malus à l'adversaire",
        active_duration: 50,
        passive_description: "Augmente la vitesse",
        passive_duration: 80,
      });

    expect(response.status).toBe(401);
  });

  test("DELETE /api/items/:id - should return 401 if no token is provided", async () => {
    const response = await request(testApp).delete(`/api/items/${itemId}`);
    expect(response.status).toBe(401);
  });

  test("GET /api/items/:id - should return 404 if item does not exist", async () => {
    const response = await request(testApp).get("/api/items/9999");
    expect(response.status).toBe(404);
  });
});
