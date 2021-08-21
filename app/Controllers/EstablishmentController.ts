import Establishment from 'App/Models/Establishment'
import EstablishmentValidator from 'App/Validator/EstablishmentValidator'
import HttpController from './Base/CrudController'

export default class EstablishmentController extends HttpController<
  EstablishmentValidator,
  typeof Establishment
>{

  constructor () {
    super(new EstablishmentValidator(), Establishment)
  }
  
}

