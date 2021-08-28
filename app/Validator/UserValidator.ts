
import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import Joi from 'joi'

export default class UserValidator implements BaseCrudValidator {
  public createValidation() {
    return Joi.object({
      cnpj: Joi
        .string()
        .required()
        .min(14)
        .regex(/^[0-9]*$/)
        .message('CNPJ is invalid'),
      phone: Joi
        .string()
        .required()
        .min(13)
        .max(14)
        .regex(/^[0-9]*$/)
        .message('Phone is invalid'),
      password: Joi
        .string()
        .required()
        .min(8)
        .max(16),
      establishment_id: Joi
        .number()
        .optional(),
      establishment: Joi
        .number()
        .optional(),
    })
      .required()
      .rename('establishment_id', 'establishment', { alias: true })
  }

  public filterValidation() {
    return Joi.object({
      pathParameters: Joi.object({
        id: Joi.number()
      })
    })
  }

  public updateByIdValidation() {
    return Joi.object({
      body: Joi.object({
        cnpj: Joi
          .string()
          .required()
          .min(14)
          .regex(/^[0-9]*$/)
          .message('CNPJ is invalid'),
        old_password: Joi
          .string()
          .required()
          .min(8)
          .max(16),
        password: Joi
          .string()
          .required()
          .min(8)
          .max(16),
      })
    }).required()
  }

  public deleteByIdValidation() {
    return Joi.object({
      id: Joi.number()
    })
  }
}