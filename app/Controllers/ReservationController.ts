import HttpException from 'App/Exceptions/HttpException'
import Reservation from 'App/Models/Reservation'
import ReservationRepository from 'App/Repository/ReservationRepository'
import CheckSchedule from 'App/Services/CheckSchedule'
import Utils from 'App/Services/Utils'
import BaseValidator from 'App/Validator/BaseValidator'
import ReservationValidator from 'App/Validator/ReservationValidator'
import { APIGatewayEvent } from 'aws-lambda'
import { Authorizer } from './AuthorizerController'

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

  public async update({
    body,
    pathParameters,
    requestContext: { authorizer }
  }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const { pathParameters: { id }, body: data } = await BaseValidator.validate(
        { body, pathParameters },
        this.validator,
        'updateByIdValidation'
      )

      const { principalId: user_id } = authorizer as Authorizer

      const user = await this.userRepository.findOneOrFail(user_id)

      const model = await this.repository.findOneOrFail(id)

      this.isUserEnabled(user, model.establishment.id)

      this.modelUpdate(model, data)

      await this.repository.persistAndFlush(model)

      return Utils.toHttpResponse(200, model)
    } catch (error) {
      throw error
    }
  }

  public async load({
    queryStringParameters,
    pathParameters,
    requestContext: { authorizer }
  }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      ({ pathParameters } = await BaseValidator.validate(
        { queryStringParameters, pathParameters },
        this.validator,
        'filterValidation')
      )

      const { principalId: user_id } = authorizer as Authorizer

      const user = await this.userRepository.findOneOrFail(user_id)

      if (pathParameters?.id) {
        const model = await this.repository.findOneOrFail({...pathParameters, establishment: user.establishment})

        return Utils.toHttpResponse(200, model)
      }

      const allModels = await this.repository.find({establishment: user.establishment})

      if (allModels.length) {
        return Utils.toHttpResponse(200, allModels)
      }

      return Utils.toHttpResponse(404, [])
    } catch (error) {
      throw error
    }
  }

  public async safeLoad({
    queryStringParameters
  }: APIGatewayEvent) {
    const filters = await BaseValidator.validate(
      queryStringParameters,
      this.validator,
      'filterByRelations'
    )

    try {
      const models = await this.repository.find(
        filters,
        {
          fields: ['interval', 'table_id', 'establishment_id', 'status']
        }
      )

      return Utils.toHttpResponse(200, models)
    } catch (error) {
      throw error
    }
  }

  public async safeUpdate({
    body,
    pathParameters,
  }: APIGatewayEvent) {
    const { pathParameters: id, body: { status, ...user } } = await BaseValidator.validate(
      { body, pathParameters },
      this.validator,
      'updateByClient'
    )

    try {
      const model = await this.repository.findOneOrFail(id)

      if (model?.phone === user.phone && model?.cpf === user.cpf) {

        this.modelUpdate(model, { status })

        await this.repository.persistAndFlush(model)

        return Utils.toHttpResponse(200, model)
      }

      throw new HttpException('User has no permission on this action', 401, {});

    } catch (error) {
      throw error
    }
  }
}
