import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Spell from './Spell';

interface SpellEffectAttributes {
  id: number;
  spell_id: number;
  order: number;
  effect: string;
}

class SpellEffect extends Model {}

SpellEffect.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    spell_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Spell,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    effect: {
      type: DataTypes.STRING(192),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'spell_effect',
    modelName: 'SpellEffect',
    timestamps: false,
  }
);

export default SpellEffect;
export type { SpellEffectAttributes };
