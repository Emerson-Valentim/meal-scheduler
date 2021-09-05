import Establishment from 'App/Models/Establishment'
import EstablishmentValidator from 'App/Validator/EstablishmentValidator'
import CrudController from './Base/CrudController'

export default class EstablishmentController extends CrudController<
  EstablishmentValidator,
  typeof Establishment
>{

  constructor() {
    super(
      new EstablishmentValidator(),
      Establishment,
    )
  }

}
