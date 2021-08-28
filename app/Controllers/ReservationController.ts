import Reservation from 'App/Models/Reservation'
import ReservationRepository from 'App/Repository/ReservationRepository'
import ReservationValidator from 'App/Validator/ReservationValidator'
import CrudController from './Base/CrudController'

export default class ReservationController extends CrudController<
  ReservationValidator,
  Reservation,
  ReservationRepository
>{

  constructor() {
    super(
      new ReservationValidator(),
      new Reservation(),
      new ReservationRepository()
    )
  }

}
