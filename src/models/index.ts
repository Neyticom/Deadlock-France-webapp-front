import sequelize from '../config/database';

import Hero from './Hero';
import Spell from './Spell';
import SpellEffect from './SpellEffect';
import Item from './Item';
import ItemEffect from './ItemEffect';
import Keyword from './Keyword';
import Patchnote from './Patchnote';
import PatchnoteEntry from './PatchnoteEntry';
import User from './User';
import Role from './Role';
import Log from './Log';
import Statistic from './Statistic';
import Setting from './Setting';
import UserHasRole from './UserHasRole';

// Hero to Spell
Hero.hasMany(Spell, {
  foreignKey: 'hero_id',
  as: 'spells'
});

Spell.belongsTo(Hero, {
  foreignKey: 'hero_id',
  as: 'hero'
});

// Spell to SpellEffect
Spell.hasMany(SpellEffect, {
  foreignKey: 'spell_id',
  as: 'spell_effects'
});

SpellEffect.belongsTo(Spell, {
  foreignKey: 'spell_id',
  as: 'spell'
});

// Item to ItemEffect
Item.hasMany(ItemEffect, {
  foreignKey: 'item_id',
  as: 'itemeffects'
});

ItemEffect.belongsTo(Item, {
  foreignKey: 'item_id',
  as: 'item'
});

// Item parent-child
Item.hasOne(Item, {
  foreignKey: 'parent_id',
  as: 'parent'
});

// Patchnote to PatchnoteEntry
Patchnote.hasMany(PatchnoteEntry, {
  foreignKey: 'patchnote_id',
  as: 'patchnote_entries'
});

PatchnoteEntry.belongsTo(Patchnote, {
  foreignKey: 'patchnote_id',
  as: 'patchnote'
});

// Role to User
Role.belongsToMany(User, {
  foreignKey: 'role_id',
  otherKey: 'user_id',
  through: UserHasRole,
  as: 'users'
});

User.belongsToMany(Role, {
  foreignKey: 'user_id',
  otherKey: 'role_id',
  through: UserHasRole,
  as: 'roles'
});

// User to Log
User.hasMany(Log, {
  foreignKey: 'user_id',
  as: 'logs'
});

Log.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
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
};

export default database;
