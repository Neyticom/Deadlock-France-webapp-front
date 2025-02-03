import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Patchnote from './Patchnote';

interface PatchnoteEntryAttributes {
  patchnote_id: number;
  category: 'BUFF' | 'NERF' | 'CHANGE' | 'FIX';
  ressource_type: 'HERO' | 'ITEM' | 'SPELL' | 'GLOBAL';
  ressource_id: number;
  position: number;
  description: string;
}

class PatchnoteEntry extends Model {}

PatchnoteEntry.init(
  {
    patchnote_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patchnote,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    ressource_type: {
      type: DataTypes.ENUM('HERO', 'ITEM', 'SPELL', 'GLOBAL'),
      allowNull: false
    },
    ressource_id: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.ENUM('BUFF', 'NERF', 'CHANGE', 'FIX'),
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'patchnote_entry',
    modelName: 'PatchnoteEntry'
  }
);

export default PatchnoteEntry;
export type { PatchnoteEntryAttributes };
