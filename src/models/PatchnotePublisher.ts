import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Patchnote from './Patchnote';
import User from './User';

interface PatchnotePublisherAttributes {
  user_id: number;
  patchnote_id: number;
}

class PatchnotePublisher extends Model {}

PatchnotePublisher.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: User, key: 'id' },
      onDelete: 'CASCADE',
    },
    patchnote_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Patchnote, key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'patchnote_publisher',
    modelName: 'PatchnotePublisher',
    timestamps: false,
  }
);

export default PatchnotePublisher;
export type { PatchnotePublisherAttributes };
