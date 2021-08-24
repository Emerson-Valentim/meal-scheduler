
import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import Joi from 'joi'

export default class EstablishmentValidator implements BaseCrudValidator {

  public createValidation() {
    return Joi.object({
      name: Joi.string()
        .required(),
      description: Joi.string()
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
        name: Joi.string().optional(),
        description: Joi.string().optional()
      })
    })
  }

  public deleteByIdValidation() {
    return Joi.object({
      id: Joi.number().required()
    })
  }
}