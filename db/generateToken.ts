import jwt from "jsonwebtoken"
import { users } from "./fakedb"
const SECRET_KEY = process.env.SECRET_KEY

// Генерация JWT токена для пользователя
export function generateToken(username: string) {
  const user = users.find((u) => u.username === username)

  if (!user) throw new Error("User not found")

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  )

  return token
}
