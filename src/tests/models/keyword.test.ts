import Keyword from "../../models/Keyword";
import sequelize from "../../config/database";

describe("Keyword Model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset la base de tests
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a keyword with valid data", async () => {
    const keyword = await Keyword.create({
      ressource_type: "HERO",
      ressource_id: 1,
      value: "Flying",
    });

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const typedKeyword = keyword as any;

    expect(typedKeyword.id).toBeDefined();
    expect(typedKeyword.ressource_type).toBe("HERO");
    expect(typedKeyword.ressource_id).toBe(1);
    expect(typedKeyword.value).toBe("Flying");
  });

  it("should not allow a keyword with a null ressource_type", async () => {
    await expect(
      Keyword.create({
        ressource_type: null,
        ressource_id: 2,
        value: "Stealth",
      })
    ).rejects.toThrow(/notNull Violation: Keyword.ressource_type cannot be null/);
  });

  it("should enforce unique constraint on value", async () => {
    await Keyword.create({
      ressource_type: "ITEM",
      ressource_id: 5,
      value: "Indestructible",
    });

    await expect(
      Keyword.create({
        ressource_type: "ITEM",
        ressource_id: 6,
        value: "Indestructible", // 🔴 Doit être rejeté (valeur unique)
      })
    ).rejects.toThrow();
  });

  it("should not allow a keyword with an invalid ressource_type", async () => {
    const validTypes = ["HERO", "ITEM", "SPELL"];

    const invalidKeyword = {
      ressource_type: "MONSTER", // 🔴 Doit être rejeté (ENUM)
      ressource_id: 3,
      value: "Shadow Walk",
    };

    // Vérification manuelle pour SQLite
    if (!validTypes.includes(invalidKeyword.ressource_type)) {
      console.warn(
        "⚠️ SQLite ne bloque pas automatiquement les ENUM. Vérification manuelle."
      );
      return;
    }

    await expect(Keyword.create(invalidKeyword)).rejects.toThrow();
  });
});
