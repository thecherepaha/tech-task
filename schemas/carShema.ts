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

export const updateCarSchema = z.object({
  id: z.string().uuid({ message: "Invalid car ID format" }),
  body: z.object({
    brand: z.string().min(1, "Brand is required").optional(),
    model: z.string().min(1, "Model is required").optional(),
    year: z
      .number()
      .min(1886, { message: "Year must be greater than 1886" })
      .optional(),
    color: z.string().optional(),
    vin: z
      .string()
      .length(17, { message: "VIN must be 17 characters" })
      .optional(),
  }),
})

export const deleteCarSchema = z.object({
  id: z.string().uuid({ message: "Invalid car ID format" }),
})
