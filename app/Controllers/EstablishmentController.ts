import Establishment from 'App/Models/Establishment'
import { EstablishmentRepository } from 'App/Repository/EstablishmentRepository'
import EstablishmentValidator from 'App/Validator/EstablishmentValidator'
import HttpController from './Base/CrudController'

export default class EstablishmentController extends HttpController<
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

