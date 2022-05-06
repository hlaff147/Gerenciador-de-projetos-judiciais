import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (table: Knex.TableBuilder) => {
      table.increments("id", { primaryKey: true });
      table.string("name").notNullable();
      table.string("cpf").unique().notNullable();
      table.string("email").notNullable();
      table.string("phone").notNullable();
      table.string("function").notNullable();
      table.string("password").notNullable();
    })
    .catch((err) => console.log(err.message));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("users")
    .catch((err) => console.log(err.message));
}
