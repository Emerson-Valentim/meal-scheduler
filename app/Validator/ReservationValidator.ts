
import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import { ReservationStatus } from 'App/Models/Reservation'
import Joi from 'joi'

export default class ReservationValidator implements BaseCrudValidator {
  public createValidation() {
    return Joi.object({
      cpf: Joi
        .string()
        .required()
        .min(11)
        .regex(/^[0-9]*$/)
        .message('CPF is invalid'),
      phone: Joi
        .string()
        .required()
        .min(13)
        .max(14)
        .regex(/^[0-9]*$/)
        .message('Phone is invalid'),
      status: Joi
        .string()
        .valid(...Object.values(ReservationStatus))
        .required(),
      table_id: Joi
        .number()
        .required(),
      table: Joi
        .number()
        .optional(),
      establishment_id: Joi
        .number()
        .required(),
      establishment: Joi
        .number()
        .optional(),
      interval: Joi
        .any()
        .required()
    })
      .rename('table_id', 'table', { alias: true })
      .rename('establishment_id', 'establishment', { alias: true })
  }

  public filterValidation() {
    return Joi.object({
      queryStringParameters: Joi
        .object({})
        .optional()
        .allow(null),
      pathParameters: Joi.object({
        id: Joi
          .number()
          .optional()
      }).allow(null)
    })
  }

  public updateByIdValidation() {
    return Joi.object({
      pathParameters: Joi.object({
        id: Joi
          .number()
          .required()
      }),
      body: Joi.object({
        status: Joi
          .string()
          .valid(...Object.values(ReservationStatus))
          .optional(),
      }).required()
    })
  }

  public deleteByIdValidation() {
    return Joi.object({
      id: Joi
        .number()
        .required()
    })
  }
}