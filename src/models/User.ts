import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Role from './Role';

interface UserAttributes {
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
    login: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(96),
      allowNull: false,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
      unique: true
    },
    "2fa": {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'user',
    modelName: 'User'
  }
);

export default User;
export type { UserAttributes };
