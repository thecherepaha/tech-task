import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("car", (table) => {
    table.unique(["vin"], { indexName: "car_vin_unique" })

    table.index(["brand", "model", "year"], "car_brand_model_year_idx")
  })
}

export async function down(knex: Knex): Promise<void> {}
