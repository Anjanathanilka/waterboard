import Sequelize from "sequelize";
import config from "./dbconfig.js";

// Create a Sequelize instance
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.server,
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false, // For secure connections
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: "+05:30",
});

// Export the instance
export default sequelize;
