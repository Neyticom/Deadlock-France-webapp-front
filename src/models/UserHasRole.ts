import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Role from './Role';

interface UserHasRoleAttributes {
  user_id: number;
  role_id: number;
}

class UserHasRole extends Model {}

UserHasRole.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      }
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Role,
          key: 'id',
        }
      }
  },
  {
    sequelize,
    tableName: 'user_has_role',
    modelName: 'UserHasRole'
  }
);

export default UserHasRole;
export type { UserHasRoleAttributes };
