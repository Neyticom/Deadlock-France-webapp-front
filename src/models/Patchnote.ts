import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface PatchnoteAttributes {
  version: string;
  title: string;
  date: Date;
  author: string;
  content: string;
  state: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

class Patchnote extends Model {}

Patchnote.init(
  {
    version: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING(96),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true
    },
    author: {
      type: DataTypes.STRING(64),
    },
    content: {
      type: DataTypes.TEXT
    },
    state: {
      type: DataTypes.ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED'),
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'patchnote',
    modelName: 'Patchnote'
  }
);

export default Patchnote;
export type { PatchnoteAttributes };
