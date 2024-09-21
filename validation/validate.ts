import { ZodSchema, ZodError } from "zod"
import { Response } from "express"
import { handleValidationError } from "./errorHandler"

// Универсальная функция для валидации данных
export function validate<T>(
  schema: ZodSchema<T>,
  data: unknown,
  res: Response
): T | void {
  try {
    return schema.parse(data) // Валидация данных
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = handleValidationError(error)
      res.status(400).send({
        message: "Validation failed",
        errors: validationErrors,
      })
    }
  }
}
