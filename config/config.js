require('dotenv').config({ path: __dirname + '/../.env' });
module.exports = {
  development: {
    username: process.env.DB_USER || "uqjcy2xvxurbmauw",
    password: process.env.DB_PASS || "xVsIx8gJjpmbaF8PKi3H",
    database: process.env.DB_NAME || "bgtligfcywwet8t88xdp",
    host: process.env.DB_HOST || "bgtligfcywwet8t88xdp-mysql.services.clever-cloud.com",
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