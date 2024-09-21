import { DatabaseSchema } from "db/schemas/DataBaseSchema"

type ICarEntity = DatabaseSchema["car"] & {
  id?: string
  limit?: number
  offset?: number | null
  search?: string | null
}

export { ICarEntity }
