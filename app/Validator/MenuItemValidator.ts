import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import Joi from 'joi'

export default class MenuItemValidator implements BaseCrudValidator {

  public createValidation() {
    return Joi.object({
      name: Joi
        .string()
        .required(),
      ingredients: Joi
        .string()
        .required(),
      value: Joi
        .number()
        .required(),
      establishment_id: Joi
        .number()
        .required(),
    })
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
        name: Joi
          .string()
          .optional(),
        ingredients: Joi
          .string()
          .optional(),
        value: Joi
          .number()
          .precision(2)
          .optional()
      }).required()
    })
  }

  public deleteByIdValidation() {
    return Joi.object({
      id: Joi.number().required()
    })
  }
}