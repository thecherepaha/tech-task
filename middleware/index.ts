import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { levels } from "@data/levels.json"

//middelware для обработки ошибок
const use =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next)

//middleware для проверки уровня эндпоинта
const access = (level: "private" | "public") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization

    if (!header) {
      return res.status(401).send({ message: "Authorization required" })
    }

    const [type, token] = header.split(" ")

    if (!type || type !== "Bearer" || !token) {
      return res.status(401).send({ message: "Authorization required" })
    }

    try {
      // Декодируем токен
      const decoded = jwt.verify(token, process.env.SECRET_KEY) as {
        role: "admin" | "user"
      }

      if (!levels[decoded.role]?.includes(level)) {
        return res.status(403).send({ message: "Forbidden: Access denied" })
      }

      // Передаем управление следующей middleware, если доступ разрешен
      next()
    } catch (error) {
      return res.status(401).send({ message: "Invalid token" })
    }
  }
}

export { use, access }
