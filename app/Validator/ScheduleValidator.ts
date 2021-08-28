
import { BaseCrudValidator } from 'App/Controllers/Base/CrudController'
import Joi from 'joi'

export default class ScheduleValidator implements BaseCrudValidator {
  createValidation() {
    throw new Error('Method not implemented.')
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