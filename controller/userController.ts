import { Request, Response } from "express"
import { generateToken } from "@db/generateToken"

const create = async (req: Request, res: Response) => {
  const { user }: { user: string } = req.body

  const token = generateToken(user)

  res.status(200).send({
    message: "Токен успешно создан!",
    token,
  })
}

export { create }
