
import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import Joi from 'joi'

export default class UserValidator implements BaseCrudValidator {
  createValidation() {
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
        .optional()
    }).required()
  }
  filterValidation() {
    throw new Error('Method not implemented.')
  }
  updateByIdValidation() {
    throw new Error('Method not implemented.')
  }
  deleteByIdValidation() {
    throw new Error('Method not implemented.')
  }

}