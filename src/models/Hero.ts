import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface HeroAttributes {
  name: string;
  resume: string;
  description: string;
  img_path: string;
  video_path: string;
}

class Hero extends Model {}

Hero.init(
  {
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
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
      unique: true
    },
    video_path: {
      type: DataTypes.STRING(128),
      unique: true
    },
  },
  {
    sequelize,
    tableName: 'hero',
    modelName: 'Hero'
  }
);

export default Hero;
export type { HeroAttributes };