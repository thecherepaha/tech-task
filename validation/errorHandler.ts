import { ZodError } from "zod"

export function handleValidationError(error: ZodError) {
  return error.errors.map((err) => ({
    field: err.path.join("."), // Поле, где возникла ошибка
    message: err.message, // Сообщение об ошибке
  }))
}
