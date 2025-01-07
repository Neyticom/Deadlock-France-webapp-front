import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Hero from './Hero';

interface SpellAttributes {
  hero_id: number;
  name: string;
  order: number;
  description: string;
  passive: boolean;
  charge: boolean;
  charge_count: number;
  charge_time: number;
  charge_interval: number;
  cooldown: number;
  distance: string;
  first_upgrade: string;
  second_upgrade: string;
  third_upgrade: string;
  icon_path: string;
  demo_path: string;
}

class Spell extends Model {}

Spell.init(
  {
    hero_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Hero,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    passive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    charge: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    charge_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    charge_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    charge_interval: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cooldown: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    distance: {
      type: DataTypes.STRING(96)
    },
    first_upgrade: {
      type: DataTypes.STRING(192)
    },
    second_upgrade: {
      type: DataTypes.STRING(192)
    },
    third_upgrade: {
      type: DataTypes.STRING(192)
    },
    icon_path: {
      type: DataTypes.STRING(128)
    },
    demo_path: {
      type: DataTypes.STRING(128)
    },
  },
  {
    sequelize,
    tableName: 'spell',
    modelName: 'Spell'
  }
);

export default Spell;
export type { SpellAttributes };
