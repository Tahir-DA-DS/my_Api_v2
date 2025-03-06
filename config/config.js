require('dotenv').config({ path: __dirname + '/../.env' });
module.exports = {
  development: {
    username: process.env.DB_USER || "uklazqagfncbwj9t",
    password: process.env.DB_PASS || "KYn2qtckDaJzjWw2Axf6",
    database: process.env.DB_NAME || "beqtecdozblr6wbeomhz",
    host: process.env.DB_HOST || "beqtecdozblr6wbeomhz-mysql.services.clever-cloud.com",
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