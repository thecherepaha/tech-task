import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import { CreateCar, DeleteCar, GetCars, UpdateCar } from "@model/Car"
import { ICarEntity } from "@interfaces"
import { validate } from "@validation/validate"
import { carSchema, deleteCarSchema, updateCarSchema } from "@shemas/carShema"
import { parseQueryParams } from "@utils/queryUtils"

/**
 * Создаем новую машину
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
  // Валидация данных автомобиля
  let data = validate(carSchema, req.body, res)

  const valid_data: ICarEntity = {
    id: uuidv4(),
    brand: data.brand,
    model: data.model,
    year: data.year,
    color: data.color,
    vin: data.vin,
  }

  const car = await CreateCar(valid_data)

  res.status(201).send({
    message: "Car successfully created!",
    carId: car.id,
  })
}

/**
 * Берем список машин с необходимой фильтрацией
 * @param req
 * @param res
 */
async function get(req: Request, res: Response) {
  const filter = parseQueryParams<ICarEntity>(req.query, {
    limit: 20,
    offset: 0,
    search: null,
  })

  const cars = await GetCars(filter)

  res.status(200).send({ ...cars })
}

/**
 * Частичное обновление данных машины
 * @param req
 * @param res
 */
async function update(req: Request, res: Response) {
  const data = validate(
    updateCarSchema,
    {
      id: req.params.id,
      body: req.body,
    },
    res
  )

  const { id, body } = data

  const _updated = await UpdateCar(id, body)

  res.status(200).send({
    message: "Car successfully updated!",
    car: _updated,
  })
}

async function remove(req: Request, res: Response) {
  // Validate car ID from req.params
  const data = validate(deleteCarSchema, req.params, res)

  await DeleteCar(data.id)

  res.status(200).send({
    message: "Car successfully deleted!",
  })
}

export { create, get, update, remove }
