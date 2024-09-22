import knex from "@dbinstance"
import { ICarEntity } from "@interfaces"
import { DatabaseSchema } from "db/schemas/DataBaseSchema"
import { Knex } from "knex"

const db = () => knex("car")

const CreateCar = async (data: ICarEntity) => {
  const car = await knex<DatabaseSchema["car"]>("car")
    .insert(data)
    .returning("id")
    .then((id) => id)

  data.id = car[0].id

  return data
}

const GetCars = async (filter: Partial<ICarEntity>) => {
  const { limit = 20, offset = 0, ..._rest_filter } = filter

  const _query = knex<DatabaseSchema["car"]>("car")

  applyFilters(_query, _rest_filter)

  const _count_query = _query
    .clone()
    .clearSelect()
    .count({ total: "*" })
    .first()

  _query.limit(limit).offset(offset)

  const [cars, { total }] = await Promise.all([
    _query.select("*"),
    _count_query,
  ])

  return {
    cars,
    total,
  }
}

const UpdateCar = async (id: string, data: Partial<DatabaseSchema["car"]>) => {
  return await knex<DatabaseSchema["car"]>("car").where({ id }).update(data)
}

//жесткое удаление
const DeleteCar = async (id: string): Promise<void> => {
  return await knex<DatabaseSchema["car"]>("car").where({ id }).del()
}

const applyFilters = (query: any, filters: Partial<ICarEntity>) => {
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "search") {
        query.where((q: Knex.QueryInterface) =>
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
}

export { db, CreateCar, DeleteCar, UpdateCar, GetCars }
