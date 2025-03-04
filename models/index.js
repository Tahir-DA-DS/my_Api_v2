const process = require('process');
require('dotenv').config({ path: __dirname + "/../.env" });
console.log("DB_URL from .env:", process.env.DB_URL);
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

console.log("Environment:", process.env.NODE_ENV);
console.log("Using Env Variable:", config.use_env_variable || "Direct Config");

let sequelize;


if (config.use_env_variable) {
  if (!process.env[config.use_env_variable]) {
    throw new Error(`Missing environment variable: ${config.use_env_variable}`);
  }
  console.log(`Connecting using env variable: ${config.use_env_variable}`);
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  if (!config.database || !config.username || !config.password || !config.host) {
    throw new Error("Missing database configuration values");
  }
  console.log("Connecting using direct config");
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.endsWith('.js') && !file.includes('.test.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;