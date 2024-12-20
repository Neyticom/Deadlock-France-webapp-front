import sequelize from '../config/database';

import Ressource from './Ressource';
import Hero from './Hero';
import Spell from './Spell';
import SpellEffect from './SpellEffect';
import Item from './Item';
import ItemEffect from './ItemEffect';
import Keyword from './Keyword';
import Patchnote from './Patchnote';
import PatchnoteEntry from './PatchnoteEntry';
import PatchnotePublisher from './PatchnotePublisher';
import User from './User';
import Role from './Role';
import Log from './Log';
import Statistic from './Statistic';
import Setting from './Setting';

// Ressource associations
Ressource.hasOne(Hero, { foreignKey: 'ressource_id', onDelete: 'CASCADE' });
Hero.belongsTo(Ressource, { foreignKey: 'ressource_id' });

Ressource.hasOne(Spell, { foreignKey: 'ressource_id', onDelete: 'CASCADE' });
Spell.belongsTo(Ressource, { foreignKey: 'ressource_id' });

Ressource.hasOne(Item, { foreignKey: 'ressource_id', onDelete: 'CASCADE' });
Item.belongsTo(Ressource, { foreignKey: 'ressource_id' });

Ressource.hasMany(Keyword, { foreignKey: 'ressource_id', onDelete: 'CASCADE' });
Keyword.belongsTo(Ressource, { foreignKey: 'ressource_id' });

Ressource.hasMany(PatchnoteEntry, { foreignKey: 'ressource_id', onDelete: 'CASCADE' });
PatchnoteEntry.belongsTo(Ressource, { foreignKey: 'ressource_id' });

// Hero to Spell
Hero.hasMany(Spell, { foreignKey: 'hero_id', onDelete: 'CASCADE' });
Spell.belongsTo(Hero, { foreignKey: 'hero_id' });

// Spell to SpellEffect
Spell.hasMany(SpellEffect, { foreignKey: 'spell_id', onDelete: 'CASCADE' });
SpellEffect.belongsTo(Spell, { foreignKey: 'spell_id' });

// Item to ItemEffect
Item.hasMany(ItemEffect, { foreignKey: 'item_id', onDelete: 'CASCADE' });
ItemEffect.belongsTo(Item, { foreignKey: 'item_id' });

// Item auto-relation (child_id)
Item.hasOne(Item, { foreignKey: 'child_id', onDelete: 'SET NULL', as: 'ChildItem' });

// Patchnote associations
Patchnote.hasMany(PatchnoteEntry, { foreignKey: 'patchnote_id', onDelete: 'CASCADE' });
PatchnoteEntry.belongsTo(Patchnote, { foreignKey: 'patchnote_id' });

// Role to User
Role.hasMany(User, { foreignKey: 'role_id', onDelete: 'CASCADE' });
User.belongsTo(Role, { foreignKey: 'role_id' });

// User to Patchnote through PatchnotePublisher
User.belongsToMany(Patchnote, {
  through: PatchnotePublisher,
  foreignKey: 'user_id',
  otherKey: 'patchnote_id',
  onDelete: 'CASCADE',
});
Patchnote.belongsToMany(User, {
  through: PatchnotePublisher,
  foreignKey: 'patchnote_id',
  otherKey: 'user_id',
  onDelete: 'CASCADE',
});

// User to Log
User.hasMany(Log, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Log.belongsTo(User, { foreignKey: 'user_id' });

const db = {
  sequelize,
  Ressource,
  Hero,
  Spell,
  SpellEffect,
  Item,
  ItemEffect,
  Keyword,
  Patchnote,
  PatchnoteEntry,
  PatchnotePublisher,
  User,
  Role,
  Log,
  Statistic,
  Setting,
};

export default db;
