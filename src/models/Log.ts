import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

interface LogAttributes {
	action: 'LOGIN' |'CREATE' | 'DELETE' | 'EDIT';  
	context: string;
	user_id: number;
	ip: string;
}

class Log extends Model {}

Log.init(
	{
		action: {
			type: DataTypes.ENUM('LOGIN', 'CREATE', 'DELETE', 'EDIT'), 
			allowNull: false
		},
		context: {
			type: DataTypes.TEXT
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id'
			}
		},
		ip: {
			type: DataTypes.INET,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'log',
		modelName: 'Log'
	},
);

export default Log;
export type { LogAttributes };
