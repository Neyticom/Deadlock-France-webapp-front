import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Patchnote from './Patchnote';
import Ressource from './Ressource';

interface PatchnoteEntryAttributes {
  id: number;
  patchnote_id: number;
  ressource_id: number;
  category: string;
  position: number;
  description: string;
}

class PatchnoteEntry extends Model {}

PatchnoteEntry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patchnote_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patchnote,
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    category: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['BUFF', 'NERF', 'CHANGE', 'FIX']],
      },
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'patchnote_entry',
    modelName: 'PatchnoteEntry',
    timestamps: false,
  }
);

export default PatchnoteEntry;
export type { PatchnoteEntryAttributes };
