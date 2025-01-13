import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface KeywordAttributes {
	ressource_type: 'HERO' | 'ITEM' | 'SPELL';
	ressource_id: number;
	value: string;
}

class Keyword extends Model {}

Keyword.init(
	{
		ressource_type: {
			type: DataTypes.ENUM('HERO', 'ITEM', 'SPELL'),
			allowNull: false
		},
		ressource_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		value: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		tableName: 'keyword',
		modelName: 'Keyword'
	},
);

export default Keyword;
export type { KeywordAttributes };
