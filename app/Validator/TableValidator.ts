
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
        establishment_id: Joi
        .number()
        .required(),
      establishment: Joi
        .number()
        .required(),
    }).rename('establishment_id', 'establishment', { alias: true })
  }

  public filterValidation() {
    return Joi.object({
      queryStringParameters: Joi.object({}).optional().allow(null),
      pathParameters: Joi.object({
        id: Joi.number().optional()
      }).allow(null)
    })
  }

  public updateByIdValidation() {
    return Joi.object({
      pathParameters: Joi.object({
        id: Joi.number().required()
      }),
      body: Joi.object({
        identification: Joi
          .number(),
        seats: Joi
          .number(),
      })
    })
  }

  public deleteByIdValidation() {
    return Joi.object({
      id: Joi.number().required()
    })
  }
}