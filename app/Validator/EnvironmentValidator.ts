
import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import { EnvironmentLocation } from 'App/Models/Environment'
import Joi from 'joi'

export default class TableValidator implements BaseCrudValidator {

  public createValidation() {
    return Joi.object({
      smoking_allowed: Joi
        .boolean()
        .required(),
      pets_allowed: Joi
        .boolean()
        .required(),
      location: Joi
        .string()
        .valid(...Object.values(EnvironmentLocation))
        .required(),
      description: Joi
        .string()
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
        smoking_allowed: Joi
          .boolean(),
        pets_allowed: Joi
          .boolean(),
        location: Joi
          .string()
          .valid(...Object.values(EnvironmentLocation)),
        description: Joi
          .string(),
      })
    })
  }

  public deleteByIdValidation() {
    return Joi.object({
      id: Joi.number().required()
    })
  }
}