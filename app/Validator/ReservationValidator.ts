
import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import { ReservationStatus } from 'App/Models/Reservation'
import Joi from 'joi'
import { DateTime } from 'luxon'

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
        .min(12)
        .max(13)
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
        .object({
          start: Joi.string().regex(/\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|\-)(?:\d{2}):?(?:\d{2}))/).required(),
          end: Joi.string().regex(/\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|\-)(?:\d{2}):?(?:\d{2}))/).required()
        })
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