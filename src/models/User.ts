import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Role from './Role';

interface UserAttributes {
  id: number;
  login: string;
  password: string;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  twoFactor: boolean;
  role_id: number;
}

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(96),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
    },
    twoFactor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'user',
    modelName: 'User',
    timestamps: true,
  }
);

export default User;
export type { UserAttributes };
