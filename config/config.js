require('dotenv').config({ path: __dirname + '/../.env' });
module.exports = {
  development: {
    username: process.env.DB_USER || "udcrgvuepc3ghy3h",
    password: process.env.DB_PASS || "Dq2IJzJcRnoSRCmhcDqL",
    database: process.env.DB_NAME || "b01wkql7xkmmwrvifev9",
    host: process.env.DB_HOST || "b01wkql7xkmmwrvifev9-mysql.services.clever-cloud.com",
    dialect: "mysql",
    use_env_variable: "DB_URL"
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "database_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "DB_URL",
    dialect: "mysql"
  }
};