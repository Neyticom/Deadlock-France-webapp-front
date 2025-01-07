import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface StatisticAttributes {
  origin: string;
  count: number;
  date: Date;
  type: 'VIEW' | 'CLICK';
}

class Statistic extends Model {}

Statistic.init(
  {
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
      defaultValue: new Date(Date.now()).setMinutes(0, 0, 0)
    },
    type: {
      type: DataTypes.ENUM('VIEW', 'CLICK'),
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'statistic',
    modelName: 'Statistic'
  }
);

export default Statistic;
export type { StatisticAttributes };
