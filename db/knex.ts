// src/knexInstance.ts
import Knex, { Knex as KnexIn } from "knex"
import knexConfig from "../knexfile"
import { DatabaseSchema } from "./schemas/DataBaseSchema"

// Create a Knex instance with type safety for your database schema
const knexInstance: KnexIn<DatabaseSchema> = Knex(knexConfig)

export default knexInstance
