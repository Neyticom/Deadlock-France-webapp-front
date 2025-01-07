import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface ItemAttributes {
  name: string;
  category: 'WEAPON' | 'VITALITY' | 'SPIRIT';
  cost: number;
  common_bonus: number;
  active_description: string;
  active_duration: number;
  passive_description: string;
  passive_duration: number;
  parent_id: number;
}

class Item extends Model {}

Item.init(
  {
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    category: {
      type: DataTypes.ENUM('WEAPON', 'VITALITY', 'SPIRIT'),
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    common_bonus: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active_description: {
      type: DataTypes.TEXT
    },
    active_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    passive_description: {
      type: DataTypes.TEXT
    },
    passive_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    parent_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Item,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    tableName: 'item',
    modelName: 'Item'
  }
);

export default Item;
export type { ItemAttributes };
