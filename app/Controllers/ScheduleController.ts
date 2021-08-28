import Schedule from 'App/Models/Schedule'
import ScheduleRepository from 'App/Repository/ScheduleRepository'
import ScheduleValidator from 'App/Validator/ScheduleValidator'
import CrudController from './Base/CrudController'

export default class ScheduleController extends CrudController<
  ScheduleValidator,
  Schedule,
  ScheduleRepository
>{

  constructor() {
    super(
      new ScheduleValidator(),
      new Schedule(),
      new ScheduleRepository()
    )
  }

}

