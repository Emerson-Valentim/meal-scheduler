import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import { WeekDays } from 'App/Models/Schedule'
import Joi from 'joi'

const hourInterval = {
  start: Joi
    .string()
    .min(8)
    .max(8)
    .optional()
    .regex(/^([01]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/),
  end:
    Joi
      .string()
      .min(8)
      .max(8)
      .optional()
      .regex(/^([01]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/)
}
export default class ScheduleValidator implements BaseCrudValidator {
  public createValidation() {
    return Joi.object({
      definition: Joi
        .object({
          [WeekDays.MONDAY]: hourInterval,
          [WeekDays.TUESDAY]: hourInterval,
          [WeekDays.WEDNESDAY]: hourInterval,
          [WeekDays.THURSDAY]: hourInterval,
          [WeekDays.FRIDAY]: hourInterval,
          [WeekDays.SATURDAY]: hourInterval,
          [WeekDays.SUNDAY]: hourInterval,
        })
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
        definition: Joi
          .any()
          .required()
      }).required()
    })
  }

  public deleteByIdValidation() {
    return Joi.object({
      id: Joi.number()
        .required()
    })
  }
}