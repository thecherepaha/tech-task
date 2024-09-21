import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import { CreateCar, GetCars } from "@model/Car"
import { ICarEntity } from "@interfaces"
import { validate } from "@validation/validate"
import { carSchema } from "@shemas/carShema"
import { parseQueryParams } from "../utils/queryUtils"

/**
 * Create new car
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
  // Валидация данных автомобиля
  let data = validate(carSchema, req.body, res)

  // Если данные не прошли валидацию, прерываем выполнение
  if (!data) return

  // Генерация UUID для нового автомобиля
  const valid_data: ICarEntity = {
    id: uuidv4(),
    brand: data.brand,
    model: data.model,
    year: data.year,
    color: data.color,
    vin: data.vin,
  }

  try {
    // Создание записи в базе данных
    const createdCar = await CreateCar(valid_data)
    // Ответ с успешным созданием автомобиля
    res.status(201).send({
      message: "Car successfully created!",
      carId: createdCar.id,
    })
  } catch (error) {
    res.status(500).send({
      message: "Error creating car",
      error: error.message,
    })
  }
}

/**
 * Get list of cars with optional filters and pagination
 * @param req
 * @param res
 */
async function get(req: Request, res: Response) {
  try {
    const filter = parseQueryParams<ICarEntity>(req.query, {
      limit: 20,
      offset: 0,
      search: null,
    })

    const cars = await GetCars(filter)

    res.status(200).send({
      message: "Cars retrieved successfully",
      cars: cars,
    })
  } catch (error) {
    res.status(500).send({
      message: "Error getting cars",
      error: error.message,
    })
  }
}

export { create, get }
