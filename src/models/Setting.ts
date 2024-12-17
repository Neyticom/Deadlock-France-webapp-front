import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface SettingAttributes {
  id: number;
  key: string;
  value: string | null;
  type: 'URL' | 'PATH' | 'TEXT';
}

class Setting extends Model {}

Setting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('URL', 'PATH', 'TEXT'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'setting',
    modelName: 'Setting',
    timestamps: false,
  }
);

export default Setting;
export type { SettingAttributes };
