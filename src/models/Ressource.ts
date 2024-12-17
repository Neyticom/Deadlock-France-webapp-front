import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface RessourceAttributes {
  id: number;
  name: string;
}

class Ressource extends Model {}

Ressource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'ressource',
    modelName: 'Ressource',
    timestamps: false,
  }
);

export default Ressource;
export type { RessourceAttributes };
