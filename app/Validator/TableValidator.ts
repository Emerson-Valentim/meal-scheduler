import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import Joi from 'joi'

export default class TableValidator implements BaseCrudValidator {

  public createValidation() {
    return Joi.object({
      identification: Joi
        .number()
        .required(),
      seats: Joi
        .number()
        .required(),
      environment_id: Joi
        .number()
        .required(),
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
        identification: Joi
          .number()
          .optional(),
        seats: Joi
          .number()
          .optional(),
        environment_id: Joi
          .number()
          .required(),
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