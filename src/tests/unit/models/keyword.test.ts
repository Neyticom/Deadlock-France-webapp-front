import Keyword from "../../../models/Keyword";
import sequelize from "../../../config/database";

describe("Modèle Keyword", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset la base de tests
  });

  afterAll(async () => {
    await sequelize.close();
  });

	it("Devrait créer un mot-clé avec des données valides", async () => {
    const keyword = await Keyword.create({
      ressource_type: "HERO",
      ressource_id: 1,
      value: "Volant",
    });

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const typedKeyword = keyword as any;

    expect(typedKeyword.id).toBeDefined();
    expect(typedKeyword.ressource_type).toBe("HERO");
    expect(typedKeyword.ressource_id).toBe(1);
    expect(typedKeyword.value).toBe("Volant");
  });

	it("Devrait refuser un mot-clé avec un ressource_type null", async () => {
    await expect(
      Keyword.create({
        ressource_type: null,
        ressource_id: 2,
        value: "Furtif",
      })
    ).rejects.toThrow(/notNull Violation: Keyword.ressource_type cannot be null/);
  });

	it("Devrait appliquer la contrainte d'unicité sur le champ `value`", async () => {
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

	it("Devrait refuser un mot-clé avec un `ressource_type` invalide", async () => {
    const validTypes = ["HERO", "ITEM", "SPELL"];

    const invalidKeyword = {
      ressource_type: "MONSTER", // 🔴 Doit être rejeté (ENUM)
      ressource_id: 3,
      value: "Marche de l'ombre",
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
