/* eslint-disable max-len */
import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import { ReservationStatus } from 'App/Models/Reservation'
import Joi from 'joi'
import { DateTime } from 'luxon'

const dateTime = Joi.string().regex(/\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|\-)(?:\d{2}):?(?:\d{2}))/).external(value => DateTime.fromISO(value).toUTC())

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
      table: Joi
        .number()
        .required(),
      establishment: Joi
        .number()
        .required(),
      interval: Joi
        .object({
          start: dateTime.required(),
          end: dateTime.required()
        })
        .required()
    })
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