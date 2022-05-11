import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("processes", (table: Knex.TableBuilder) => {
      table.string("defendantId");
      table.string("defendantCpf");
      table.renameColumn("lawyerId", "authorId");

      table.foreign("defendantId").references("id").inTable("users");
    })
    .catch((err) => console.log(err.message));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("processes", (table: Knex.TableBuilder) => {
      table.dropColumn("defendantId");
      table.dropColumn("defendantCpf");
      table.renameColumn("authorId", "lawyerId");
    })
    .catch((err) => console.log(err.message));
}
