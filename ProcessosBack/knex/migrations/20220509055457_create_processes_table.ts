import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("processes", (table: Knex.TableBuilder) => {
      table.increments("id", { primaryKey: true });
      table.string("name").notNullable();
      table.string("status").notNullable().defaultTo("em andamento");
      table.datetime("startDate", { precision: 6 }).defaultTo(knex.fn.now());
      table.integer("lawyerId").notNullable();
      table.integer("judgeId").notNullable();

      table.foreign("lawyerId").references("id").inTable("users");
      table.foreign("judgeId").references("id").inTable("users");
    })
    .catch((err) => console.log(err.message));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .hasTable("processes")
    .then((exists: boolean) => {
      if (exists) return knex.schema.dropTable("processes");
    })
    .catch((err) => console.log(err.message));
}
