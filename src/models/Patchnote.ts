import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface PatchnoteAttributes {
  id: number;
  version: string;
  title: string;
  date: Date;
  author: string | null;
  content: string | null;
  state: string;
}

class Patchnote extends Model<PatchnoteAttributes> {}

Patchnote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    version: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(96),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    author: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['DRAFT', 'PUBLISHED', 'ARCHIVED']],
      },
    },
  },
  {
    sequelize,
    tableName: 'patchnote',
    modelName: 'Patchnote',
    timestamps: false,
  }
);

export default Patchnote;
export type { PatchnoteAttributes };
