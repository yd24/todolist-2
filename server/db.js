//initialize pool of connections to PostgreSQL DB
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PW,
  port: process.env.DB_PORT,
});

module.exports = pool;