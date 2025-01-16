import sequelize from "../config/database";

import Hero from "./Hero";
import Spell from "./Spell";
import SpellEffect from "./SpellEffect";
import Item from "./Item";
import ItemEffect from "./ItemEffect";
import Keyword from "./Keyword";
import Patchnote from "./Patchnote";
import PatchnoteEntry from "./PatchnoteEntry";
import User from "./User";
import Role from "./Role";
import Log from "./Log";
import Statistic from "./Statistic";
import Setting from "./Setting";
import UserHasRole from "./UserHasRole";

// Hero ↔ Spell
Hero.hasMany(Spell, { foreignKey: "hero_id", as: "spells" });
Spell.belongsTo(Hero, { foreignKey: "hero_id", as: "hero" });

// Spell ↔ SpellEffect
Spell.hasMany(SpellEffect, { foreignKey: "spell_id", as: "spell_effects" });
SpellEffect.belongsTo(Spell, { foreignKey: "spell_id", as: "spell" });

// Item ↔ ItemEffect
Item.hasMany(ItemEffect, { foreignKey: "item_id", as: "itemeffects" });
ItemEffect.belongsTo(Item, { foreignKey: "item_id", as: "item" });

// Item parent-child
Item.hasOne(Item, { foreignKey: "parent_id", as: "parent" });

// Patchnote ↔ PatchnoteEntry
Patchnote.hasMany(PatchnoteEntry, {
	foreignKey: "patchnote_id",
	as: "patchnote_entries",
});
PatchnoteEntry.belongsTo(Patchnote, {
	foreignKey: "patchnote_id",
	as: "patchnote",
});

// User ↔ Log
User.hasMany(Log, { foreignKey: "user_id", as: "logs" });
Log.belongsTo(User, { foreignKey: "user_id", as: "user" });

// User ↔ Role via UserHasRole
User.belongsToMany(Role, {
	through: UserHasRole,
	foreignKey: "user_id",
	otherKey: "role_id",
	as: "roles",
});

Role.belongsToMany(User, {
	through: UserHasRole,
	foreignKey: "role_id",
	otherKey: "user_id",
	as: "users",
});

UserHasRole.belongsTo(Role, {
	foreignKey: "role_id",
	as: "role",
  });
  
  UserHasRole.belongsTo(User, {
	foreignKey: "user_id",
	as: "user",
  });  

const database = {
	sequelize,
	Hero,
	Spell,
	SpellEffect,
	Item,
	ItemEffect,
	Keyword,
	Patchnote,
	PatchnoteEntry,
	User,
	Role,
	Log,
	Statistic,
	Setting,
	UserHasRole,
};

export default database;
