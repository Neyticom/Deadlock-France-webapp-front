import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Ressource from "./Ressource";

interface KeywordAttributes {
	id: number;
	ressource_id: number;
	value: string;
}

class Keyword extends Model {}

Keyword.init(
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
				key: "id",
			},
			onDelete: "CASCADE",
		},
		value: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		tableName: "keyword",
		modelName: "Keyword",
		timestamps: false,
	},
);

export default Keyword;
export type { KeywordAttributes };
