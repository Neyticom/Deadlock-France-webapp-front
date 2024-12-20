import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Item from './Item';

interface ItemEffectAttributes {
  id: number;
  item_id: number;
  type: string;
  effect: string;
}

class ItemEffect extends Model {}

ItemEffect.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Item,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['COMMON', 'ACTIVE', 'PASSIVE']],
      },
    },
    effect: {
      type: DataTypes.STRING(192),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'item_effect',
    modelName: 'ItemEffect',
    timestamps: false,
  }
);

export default ItemEffect;
export type { ItemEffectAttributes };
