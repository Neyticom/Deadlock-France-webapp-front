import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

interface LogAttributes {
  id: number;
  action: string;
  context?: string;
  user_id: number;
  ip: string;
}

class Log extends Model {}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['LOGIN', 'CREATE', 'DELETE', 'EDIT']],
      },
    },
    context: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    ip: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'log',
    modelName: 'Log',
    timestamps: false,
  }
);

export default Log;
export type { LogAttributes };
