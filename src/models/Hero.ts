import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Ressource from './Ressource';

interface HeroAttributes {
  id: number;
  ressource_id: number;
  resume: string;
  description: string;
  img_path: string;
  video_path: string;
}

class Hero extends Model {}

Hero.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ressource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ressource,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    resume: {
      type: DataTypes.STRING(96),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img_path: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: '',
    },
    video_path: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'hero',
    modelName: 'Hero',
    timestamps: true,
  }
);

export default Hero;
export type { HeroAttributes };