import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Spell from './Spell';

interface SpellEffectAttributes {
  spell_id: number;
  order: number;
  effect: string;
}

class SpellEffect extends Model {}

SpellEffect.init(
  {
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
    modelName: 'SpellEffect'
  }
);

export default SpellEffect;
export type { SpellEffectAttributes };
