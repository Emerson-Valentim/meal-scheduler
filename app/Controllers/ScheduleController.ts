import Schedule from 'App/Models/Schedule'
import ScheduleValidator from 'App/Validator/ScheduleValidator'
import CrudController from './Base/CrudController'

export default class ScheduleController extends CrudController<
  ScheduleValidator,
  typeof Schedule
>{

  constructor() {
    super(
      new ScheduleValidator(),
      Schedule,
    )
  }

}
