import { Knex } from "knex"

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("car").del()

  // Inserts seed entries
  await knex("car").insert([
    {
      id: "4f15ec7f-dc54-4dd1-8567-3dddc3332445",
      brand: "BMW",
      model: "X7 series",
      year: 2020,
      color: "black",
      vin: "JH4KA2550HC005889",
    },
    {
      id: "2be28676-c4d4-408c-9bb6-4c1fe1e890e6",
      brand: "Audi",
      model: "RS8",
      year: 2021,
      color: "black",
      vin: "JH4DB8580RS000024",
    },
  ])
}
