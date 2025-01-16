import "../src/models";
import database from '../src/models/index';

// Synchronisation de la base de données Sequelize
database.sequelize
	.sync({ force: true })
	.then(() => {
		console.log("✅ Database synced successfully...");
	})
	.catch((error) => {
		console.error("❌ Database synchronization failed:", error);
	});