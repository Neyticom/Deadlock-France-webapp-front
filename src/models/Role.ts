import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface RoleAttributes {
  name: string;
  weight: number;
}

class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
  },
  {
    sequelize,
    tableName: 'role',
    modelName: 'Role',
    timestamps: false,
  }
);

export default Role;
export type { RoleAttributes };
