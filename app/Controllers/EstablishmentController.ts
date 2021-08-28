import Establishment from 'App/Models/Establishment'
import EstablishmentRepository from 'App/Repository/EstablishmentRepository'
import EstablishmentValidator from 'App/Validator/EstablishmentValidator'
import CrudController from './Base/CrudController'

export default class EstablishmentController extends CrudController<
  EstablishmentValidator,
  Establishment,
  EstablishmentRepository
>{

  constructor() {
    super(
      new EstablishmentValidator(),
      new Establishment(),
      new EstablishmentRepository()
    )
  }

}
