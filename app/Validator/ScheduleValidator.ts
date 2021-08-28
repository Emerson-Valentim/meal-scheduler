
import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import Joi from 'joi'

export default class ScheduleValidator implements BaseCrudValidator {
  public createValidation() {
    return Joi.object({
      definition: Joi
        .any()
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