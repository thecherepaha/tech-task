import { Router } from "express"
import { use } from "@middleware"
import { create } from "@controller/userController"
const api = Router()

api.post("/token", use(create))

export default api
