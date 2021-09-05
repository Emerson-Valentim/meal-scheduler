import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import { EnvironmentLocation } from 'App/Models/Environment'
import Joi from 'joi'

export default class EnvironmentValidator implements BaseCrudValidator {

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
        smoking_allowed: Joi
          .boolean()
          .optional(),
        pets_allowed: Joi
          .boolean()
          .optional(),
        location: Joi
          .string()
          .valid(...Object.values(EnvironmentLocation))
          .optional(),
        description: Joi
          .string()
          .optional(),
      }).required()
    })
  }

  public deleteByIdValidation() {
    return Joi.object({
      id: Joi.number().required()
    })
  }
}