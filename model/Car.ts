import knex from "@db"
import { ICarEntity } from "@interfaces"
import { DatabaseSchema } from "db/schemas/DataBaseSchema"

export const db = () => knex("car")

export const CreateCar = async (data: ICarEntity) => {
  const car = await knex<DatabaseSchema["car"]>("car")
    .insert(data)
    .returning("id")
    .then((id) => id)

  data.id = car[0].id

  return data
}

export const GetCars = async (filter: Partial<ICarEntity>) => {
  const query = knex<DatabaseSchema["car"]>("car").select("*")

  const { limit, offset, ...rest_filter } = filter
  console.log(filter)

  //динамически вставляем фильтр параметры
  Object.entries(rest_filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "search") {
        query.where((q) =>
          q
            .whereILike("brand", `%${value}%`)
            .orWhereILike("model", `%${value}%`)
            .orWhereILike("color", `%${value}%`)
        )
      } else {
        query.where(key, value)
      }
    }
  })

  // Apply limit and offset
  query.limit(filter.limit ?? 20)
  query.offset(filter.offset ?? 0)

  // Execute the query and return the results
  return await query
}
