import type { Knex } from "knex";
const path = require("path");

const config: { [key: string]: Knex.Config } = {
  test: {
    client: "sqlite3",
    connection: ":memory:",
    migrations: {
      directory: path.join(__dirname, "knex", "migrations"),
    },
    useNullAsDefault: true,
    //debug: true,
  },
  development: {
    client: "sqlite3",
    connection: {
      filename: "dev.sqlite3",
    },
    useNullAsDefault: true,
    debug: true,
  },
};

module.exports = config;
