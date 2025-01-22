import database from "../../models/index";

describe("Database Associations", () => {
	beforeAll(async () => {
		await database.sequelize.sync({ force: true }); // Reset la base de tests
	});

	afterAll(async () => {
		await database.sequelize.close();
	});

	it("should have all models initialized", () => {
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

	it("should have proper Hero → Spell association", () => {
		expect(database.Hero.associations.spells).toBeDefined();
		expect(database.Spell.associations.hero).toBeDefined();
	});

	it("should have proper Spell → SpellEffect association", () => {
		expect(database.Spell.associations.spell_effects).toBeDefined();
		expect(database.SpellEffect.associations.spell).toBeDefined();
	});

	it("should have proper Item → ItemEffect association", () => {
		expect(database.Item.associations.itemeffects).toBeDefined();
		expect(database.ItemEffect.associations.item).toBeDefined();
	});

	it("should have proper Item parent-child association", () => {
		expect(database.Item.associations.parent).toBeDefined();
	});

	it("should have proper Patchnote → PatchnoteEntry association", () => {
		expect(database.Patchnote.associations.patchnote_entries).toBeDefined();
		expect(database.PatchnoteEntry.associations.patchnote).toBeDefined();
	});

	it("should have proper User → Log association", () => {
		expect(database.User.associations.logs).toBeDefined();
		expect(database.Log.associations.user).toBeDefined();
	});

	it("should have proper User ↔ Role many-to-many association via UserHasRole", () => {
		expect(database.User.associations.roles).toBeDefined();
		expect(database.Role.associations.users).toBeDefined();
		expect(database.UserHasRole.associations.role).toBeDefined();
		expect(database.UserHasRole.associations.user).toBeDefined();
	});
});
