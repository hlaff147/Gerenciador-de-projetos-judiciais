import knex from "knex";

const config = require("../../knexfile");

//export const db = knex(config.test);
export const db = knex(config.development);
