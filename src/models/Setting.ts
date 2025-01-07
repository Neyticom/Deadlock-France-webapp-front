import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface SettingAttributes {
  key: string;
  value: string;
  type: 'URL' | 'PATH' | 'TEXT';
}

class Setting extends Model {}

Setting.init(
  {
    key: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    value: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM('URL', 'PATH', 'TEXT'),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'setting',
    modelName: 'Setting'
  }
);

export default Setting;
export type { SettingAttributes };
