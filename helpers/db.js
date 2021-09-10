require("dotenv").config();
const knex = require("knex");

const database = knex({
  client: "mysql2",
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
});

database
  .raw("SELECT 1")
  .then((raw) => {
    console.log("MySQL connected", raw);
  })
  .catch((e) => {
    console.log("MySQl not connected");
    console.error(e);
  });

module.exports = database;
