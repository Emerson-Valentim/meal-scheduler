import Reservation from 'App/Models/Reservation'
import ReservationRepository from 'App/Repository/ReservationRepository'
import CheckSchedule from 'App/Services/CheckSchedule'
import Utils from 'App/Services/Utils'
import BaseValidator from 'App/Validator/BaseValidator'
import ReservationValidator from 'App/Validator/ReservationValidator'
import { APIGatewayEvent } from 'aws-lambda'
import CrudController, { BaseHttpResponse } from './Base/CrudController'

export default class ReservationController extends CrudController<
  ReservationValidator,
  ReservationRepository,
  Reservation
>{

  constructor() {
    super(
      new ReservationValidator(),
      new Reservation(),
    )
  }

  public async create({ body }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(body, this.validator, 'createValidation')

      const model = await this.repository.create(data)

      await this.repository.populate(model, ['establishment.schedule'])

      await CheckSchedule.isIntervalAvailable(model, this.repository)

      await this.repository.persistAndFlush(model)

      return Utils.toHttpResponse(201, model)
    } catch (error) {
      throw error
    }
  }
}
