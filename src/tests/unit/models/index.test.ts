import database from "../../../models/index";

describe("Tests des associations de la base de données", () => {
	beforeAll(async () => {
		await database.sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await database.sequelize.close();
	});

	it("Devrait initialiser tous les modèles", () => {
		expect(database.Hero).toBeDefined();
		expect(database.Spell).toBeDefined();
		expect(database.SpellEffect).toBeDefined();
		expect(database.Item).toBeDefined();
		expect(database.ItemEffect).toBeDefined();
		expect(database.Keyword).toBeDefined();
		expect(database.Patchnote).toBeDefined();
		expect(database.PatchnoteEntry).toBeDefined();
		expect(database.User).toBeDefined();
		expect(database.Role).toBeDefined();
		expect(database.Log).toBeDefined();
		expect(database.Statistic).toBeDefined();
		expect(database.Setting).toBeDefined();
		expect(database.UserHasRole).toBeDefined();
	});

	it("Devrait gérer l'association entre Hero et Spell", () => {
		expect(database.Hero.associations.spells).toBeDefined();
		expect(database.Spell.associations.hero).toBeDefined();
	});

	it("Devrait gérer l'association entre Spell et SpellEffect", () => {
		expect(database.Spell.associations.spell_effects).toBeDefined();
		expect(database.SpellEffect.associations.spell).toBeDefined();
	});

	it("Devrait gérer l'association entre Item et ItemEffect", () => {
		expect(database.Item.associations.itemeffects).toBeDefined();
		expect(database.ItemEffect.associations.item).toBeDefined();
	});

	it("Devrait gérer l'association entre un Item parent et ses enfants", () => {
		expect(database.Item.associations.parent).toBeDefined();
	});

	it("Devrait gérer l'association entre Patchnote et PatchnoteEntry", () => {
		expect(database.Patchnote.associations.patchnote_entries).toBeDefined();
		expect(database.PatchnoteEntry.associations.patchnote).toBeDefined();
	});

	it("Devrait gérer l'association entre User et Log", () => {
		expect(database.User.associations.logs).toBeDefined();
		expect(database.Log.associations.user).toBeDefined();
	});

	it("Devrait gérer l'association many-to-many entre User et Role via UserHasRole", () => {
		expect(database.User.associations.roles).toBeDefined();
		expect(database.Role.associations.users).toBeDefined();
		expect(database.UserHasRole.associations.role).toBeDefined();
		expect(database.UserHasRole.associations.user).toBeDefined();
	});
});
