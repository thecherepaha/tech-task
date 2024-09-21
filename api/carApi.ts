import { Router } from "express"
import { create, get } from "@controller/carController"
const api = Router()

api.post("/car", create)
api.get("/car", get)

export default api
