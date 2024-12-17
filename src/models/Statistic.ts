import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface StatisticAttributes {
  id: number;
  origin: string;
  count: number;
  date: Date;
  type: 'VIEW' | 'CLICK';
}

class Statistic extends Model {}

Statistic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    origin: {
      type: DataTypes.STRING(96),
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('VIEW', 'CLICK'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'statistic',
    modelName: 'Statistic',
    timestamps: false,
  }
);

export default Statistic;
export type { StatisticAttributes };
