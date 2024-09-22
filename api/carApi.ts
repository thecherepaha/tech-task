import { Router } from "express"
import { create, get, update, remove } from "@controller/carController"
import { use, access } from "@middleware"
const api = Router()

api.post("/car", access("private"), use(create))
api.get("/car", access("public"), use(get))
api.patch("/car/:id", access("private"), use(update))
api.delete("/car/:id", access("private"), use(remove))

export default api
