import { z } from "zod"

// Схема для валидации данных автомобиля
export const carSchema = z.object({
  id: z.string().uuid().optional(), // ID генерируется сервером
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .number()
    .min(1886, "Year must be greater than 1886")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  color: z.string().min(1, "Color is required"),
  vin: z.string().length(17, "VIN must be 17 characters long"),
})
