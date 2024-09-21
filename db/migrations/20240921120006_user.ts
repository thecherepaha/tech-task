import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("car", (table) => {
    table.specificType("id", "char(36) primary key").comment("UUID машины")
    table.string("brand", 191).notNullable().comment("Бренд машины")
    table.string("model", 191).notNullable().comment("Модель машины")
    table.string("year", 191).notNullable().comment("Год выпуска")
    table.string("color", 191).notNullable().comment("Цвет машины")
    table
      .specificType("vin", "char(17)")
      .notNullable()
      .comment("VIN код машины")
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("car")
}
