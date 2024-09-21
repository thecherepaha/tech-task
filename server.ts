import "module-alias/register"
import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import REST_API from "@api"

const app = express()
const PORT = process.env.SERVER_PORT || 8080
import knex from "@db"

app.use(
  cors({
    credentials: true,
  })
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/api", REST_API)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`App is successfully running on port ${PORT}`)
})

process.on("SIGTERM", async () => {
  console.log("Shutting down...")
  await knex.destroy()
  process.exit(0)
})
