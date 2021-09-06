import { wrap } from 'mikro-orm'
import { APIGatewayEvent } from 'aws-lambda'
import User from 'App/Models/User'
import Establishment from 'App/Models/Establishment'
import BaseValidator from 'App/Validator/BaseValidator'
import EstablishmentValidator from 'App/Validator/EstablishmentValidator'
import Utils from 'App/Services/Utils'
import CrudController, { BaseHttpResponse } from './Base/CrudController'
import Orm from 'Start/orm'
import { Authorizer } from './AuthorizerController'
import HttpException from 'App/Exceptions/HttpException'

export default class EstablishmentController extends CrudController<
  EstablishmentValidator,
  Establishment
>{

  protected userRepository = Orm.em.getRepository(User)

  constructor() {
    super(
      new EstablishmentValidator(),
      new Establishment(),
    )
  }

  public async create({
    body,
    requestContext: { authorizer }
  }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(body, this.validator, 'createValidation')

      const { principalId: { id: user_id, establishment } } = authorizer as Authorizer

      if (establishment) return Utils.toHttpResponse(400, { message: 'User already has an establishment' })

      const model = await this.repository.create(data)

      await this.repository.persistAndFlush(model)

      const user = await this.userRepository.findOneOrFail(user_id)

      wrap(user).assign({
        establishment: model
      })

      await this.userRepository.persistAndFlush(user)

      return Utils.toHttpResponse(201, model)
    } catch (error) {
      throw error
    }
  }

  public async delete({
    pathParameters,
    requestContext: { authorizer }
  }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(pathParameters, this.validator, 'deleteByIdValidation')

      const { principalId: { id: user_id, establishment } } = authorizer as Authorizer

      this.userHasEstablishment(establishment?.id)

      const model = await this.repository.findOneOrFail(data)

      const user = await this.userRepository.findOneOrFail(user_id)

      this.isUserEnabled(user, model)

      await this.repository.removeAndFlush(model)

      return Utils.toHttpResponse(202, { message: `ID ${data.id} deleted.` })
    } catch (error) {
      throw error
    }
  }

  private userHasEstablishment(establishment: number | undefined) {
    if (!establishment) {
      throw new HttpException('User has no establishment', 400, {})
    }
  }

  private isUserEnabled(user: User, model: Establishment) {
    if (user.establishment.id !== model.id) {
      throw new HttpException('User is not the establishment owner', 400, {})
    }
  }
}
