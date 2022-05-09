import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("documents", (table: Knex.TableBuilder) => {
      table.increments("id", { primaryKey: true });
      table.string("name").notNullable();
      table.binary("data").notNullable();
      table.datetime("datePosted", { precision: 6 }).defaultTo(knex.fn.now());
      table.integer("postedBy").notNullable();
      table.integer("processId").notNullable();

      table.foreign("postedBy").references("id").inTable("users");
      table.foreign("processId").references("id").inTable("processes");
    })
    .catch((err) => console.log(err.message));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .hasTable("documents")
    .then((exists: boolean) => {
      if (exists) return knex.schema.dropTable("documents");
    })
    .catch((err) => console.log(err.message));
}
