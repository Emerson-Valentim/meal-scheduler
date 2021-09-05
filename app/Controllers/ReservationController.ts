import Reservation from 'App/Models/Reservation'
import ReservationValidator from 'App/Validator/ReservationValidator'
import CrudController from './Base/CrudController'

export default class ReservationController extends CrudController<
  ReservationValidator,
  typeof Reservation
>{

  constructor() {
    super(
      new ReservationValidator(),
      Reservation,
    )
  }

}
