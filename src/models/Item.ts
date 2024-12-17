import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Ressource from './Ressource';

interface ItemAttributes {
  id: number;
  ressource_id: number;
  name: string;
  category: string;
  cost: number;
  common_bonus: number;
  active_description?: string;
  active_duration: number;
  passive_description?: string;
  passive_duration: number;
  child_id?: number;
}

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ressource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ressource,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['WEAPON', 'VITALITY', 'SPIRIT']],
      },
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    common_bonus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    active_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    passive_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    passive_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    child_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Item,
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    tableName: 'item',
    modelName: 'Item',
    timestamps: false,
  }
);

export default Item;
export type { ItemAttributes };