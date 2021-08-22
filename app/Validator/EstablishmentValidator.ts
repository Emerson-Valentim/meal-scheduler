
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
    throw new Error('Method not implemented.')
  }
  
  public updateByIdValidation() {
    throw new Error('Method not implemented.')
  }

  public deleteByIdValidation() {
    throw new Error('Method not implemented.')
  }
}