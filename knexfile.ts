import * as dotenv from "dotenv"
dotenv.config()

import { Knex } from "knex"

const config: Knex.Config = {
  client: process.env.DB_CLIENT || "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
  },
  pool: {
    min: 2,
    max: 19,
  },
  migrations: {
    directory: __dirname + "/db/migrations",
  },
  seeds: {
    directory: __dirname + "/db/seeds",
  },
}

export default config
