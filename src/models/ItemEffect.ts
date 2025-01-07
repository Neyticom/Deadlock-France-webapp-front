import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Item from './Item';

interface ItemEffectAttributes {
  item_id: number;
  type: 'COMMON' | 'ACTIVE' | 'PASSIVE';
  effect: string;
}

class ItemEffect extends Model {}

ItemEffect.init(
  {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Item,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    type: {
      type: DataTypes.ENUM('COMMON', 'ACTIVE', 'PASSIVE'),
      allowNull: false
    },
    effect: {
      type: DataTypes.STRING(192),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'item_effect',
    modelName: 'ItemEffect'
  }
);

export default ItemEffect;
export type { ItemEffectAttributes };
